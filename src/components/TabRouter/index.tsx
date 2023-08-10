import { Route, Routes, useLocation } from "react-router-dom";
import { Search, Favorite, GraphIQL } from "../../pages";
import Tab from "../Tab";
import * as Styled from "./styles";

const TabRouter = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Styled.UlContainer>
        <Tab path="/" label="Search Repositories" selected={pathname === "/"} />
        <Tab
          path="/Favorite"
          label="Favorite List"
          selected={pathname === "/Favorite"}
        />
      </Styled.UlContainer>

      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/Favorite" element={<Favorite />} />
        <Route path="/editor" element={<GraphIQL />} />
      </Routes>
    </>
  );
};

export default TabRouter;
