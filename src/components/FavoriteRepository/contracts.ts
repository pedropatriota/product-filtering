export interface FavoriteRepoProps {
  id: string;
  owner: { avatarUrl: string; login?: string };
  name: string;
  description: string;
  url: string;
  favoriteRate: number;
}
