export type MovieDetailsResponse = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  tagline?: string;
  popularity: number;
  genres: Genre[];
  vote_average: number;
};

export type Genre = {
  id: number;
  name: string;
};
