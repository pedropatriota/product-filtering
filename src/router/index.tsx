import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "../pages";

interface RouterProps {
  pathname: string;
}

const Router = ({ pathname }: RouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
