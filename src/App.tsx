import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./service/client";
import GlobalStyle from "./styles/globalStyle";
import ContextFavoriteProvider from "./context/favoriteContext";
import * as Styled from "./app.styles";
import TabRouter from "./components/TabRouter";

function App() {
  return (
    <Styled.Container>
      <ApolloProvider client={client}>
        <ContextFavoriteProvider>
          <Router>
            <TabRouter />
          </Router>
        </ContextFavoriteProvider>
      </ApolloProvider>
      <GlobalStyle />
    </Styled.Container>
  );
}

export default App;
