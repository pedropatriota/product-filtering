import { ReactNode, createContext, useEffect, useState } from "react";

type ListProps = {
  id: string;
  name: string;
  url: string;
  owner: { login: string; avatarUrl: string };
  description: string;
};
type Ids = { [key: string]: number };

export interface FavoriteProps {
  favoriteIds: Ids;
  favoriteList: ListProps[];
  handleFavorite: (id: string, repo: ListProps) => void;
}
export type TContextProp = { children: ReactNode };

export const ContextFavorite = createContext<FavoriteProps>({
  favoriteIds: {},
  favoriteList: [],
  handleFavorite: (id, repo) => {},
});

const contextFavoriteProvider = ({ children }: TContextProp) => {
  const [favoriteList, setFavoriteList] = useState<ListProps[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Ids>({});

  const updateFavoriteIds = (ids: Ids) => {
    setFavoriteIds(ids);
  };

  const updateFavoriteList = (repo: ListProps) => {
    setFavoriteList((prev) => [...prev, repo]);
  };

  useEffect(() => {
    if (!localStorage.getItem("favorite")) {
      return;
    }
    const favorite = JSON.parse(localStorage.getItem("favorite") as string);
    setFavoriteList(favorite.list);
    setFavoriteIds(favorite.ids);
  }, []);

  useEffect(() => {
    if (Object.keys(favoriteIds).length || favoriteList.length) {
      const favorite = { ids: { ...favoriteIds }, list: [...favoriteList] };
      localStorage.setItem("favorite", JSON.stringify(favorite));
    }
  }, [favoriteIds, favoriteList?.length]);

  const handleFavorite = (id: string, repo: ListProps) => {
    let hash: { [key: string]: number } = { ...favoriteIds };

    if (id in favoriteIds) {
      hash[id] += 1;
    } else {
      hash[id] = 1;
      updateFavoriteList(repo);
    }
    updateFavoriteIds(hash);
  };

  const value = {
    favoriteIds,
    favoriteList,
    handleFavorite,
  };

  return (
    <ContextFavorite.Provider value={value}>
      {children}
    </ContextFavorite.Provider>
  );
};

export default contextFavoriteProvider;
