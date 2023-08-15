import { BrowserRouter as Router } from "react-router-dom";

import GlobalStyle from "./styles/globalStyle";
import HomeContextProvider from "./context/homeContext";
import * as Styled from "./app.styles";

function App() {
  return (
    <Styled.Container>
      <HomeContextProvider>
        <Router />
      </HomeContextProvider>
      <GlobalStyle />
    </Styled.Container>
  );
}

export default App;
