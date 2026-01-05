import { Genre } from "./genre";

export type MovieDetailsResponse = {
  id: number;
  title: string;
  //name: string;
  //first_air_date: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  tagline?: string;
  popularity: number;
  genres: Genre[];
  vote_average: number;
};


