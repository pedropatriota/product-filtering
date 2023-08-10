import gql from "graphql-tag";

export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($searchTerm: String!, $cursor: String) {
    search(query: $searchTerm, type: REPOSITORY, first: 30, after: $cursor) {
      edges {
        node {
          ... on Repository {
            id
            name
            owner {
              avatarUrl
              login
            }
            url
            description
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
