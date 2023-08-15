import { FC, PropsWithChildren, ReactNode, createContext } from "react";

export interface Props {}
export type TContextProp = { children: ReactNode };

export const HomeContext = createContext<Props>({});

const HomeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = {};

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export default HomeContextProvider;
