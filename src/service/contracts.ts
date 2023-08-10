export interface IRepoProps {
  name: string;
  id: string;
  url: string;
  owner: { avatarUrl: string; login: string };
  description: string;
}

export interface IApiResponse {
  info: {
    next: string | null;
  };
  results: IRepoProps[];
}

export interface Repository {
  name: string;
  url: string;
  id: string;
}

export interface Edge {
  node: Repository;
}

interface SearchResult {
  search: {
    edges: Edge[];
  };
}
