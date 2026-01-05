import { Genre } from "./genre";

export type TvShowDetailsResponse = {
  id: number;
  name: string;
 // title: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: Genre[];
  vote_average: number;
  tagline: string;
  //release_date: string;
};
