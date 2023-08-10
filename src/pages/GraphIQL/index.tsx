import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";

const accessToken = import.meta.env.VITE_GITHUB_TOKEN;

const GraphiQLComponent = () => {
  const fetcher = (graphQLParams: any) =>
    fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphQLParams),
    }).then((response) => response.json());

  return <GraphiQL fetcher={fetcher} />;
};

export default GraphiQLComponent;
