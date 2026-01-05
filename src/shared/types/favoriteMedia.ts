export type MediaType = "movie" | "tv";

export type FavoriteMedia = {
  id: number;
  mediaType: MediaType;
  poster_path: string | null;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
};
