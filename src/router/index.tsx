import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Search, Favorite, GraphIQL } from "../pages";
import Tab from "../components/Tab";
import * as Styled from "./styles";

interface RouterProps {
  pathname: string;
}

const Router = ({ pathname }: RouterProps) => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default Router;
