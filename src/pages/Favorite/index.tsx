import { useContext } from "react";
import { FavoriteRepository } from "../../components";
import { ContextFavorite } from "../../context/favoriteContext";

import * as Styled from "./styles";

const Favorite = () => {
  const { favoriteList, favoriteIds } = useContext(ContextFavorite);

  const createDataToFavoriteRepositories = () => {
    const newFavoriteList = favoriteList.map(({ ...params }) => {
      const favoriteRate = favoriteIds[params.id];

      return {
        ...params,
        favoriteRate,
      };
    });

    return newFavoriteList;
  };

  const favoriteData = createDataToFavoriteRepositories();

  return (
    <Styled.Container>
      <Styled.FavoriteContainer>
        {favoriteData.map(
          ({ id, name, owner, description, url, favoriteRate }) => (
            <FavoriteRepository
              key={id}
              id={id}
              name={name}
              owner={owner}
              description={description}
              url={url}
              favoriteRate={favoriteRate}
            />
          )
        )}
      </Styled.FavoriteContainer>
    </Styled.Container>
  );
};

export default Favorite;
