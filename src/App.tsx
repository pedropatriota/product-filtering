import Router from "./router";
import GlobalStyle from "./styles/globalStyle";
import HomeContextProvider from "./context/homeContext";
import * as Styled from "./app.styles";

function App() {
  return (
    <Styled.Container>
      <HomeContextProvider>
        <Router />
        <GlobalStyle />
      </HomeContextProvider>
    </Styled.Container>
  );
}

export default App;
