import type { MoviesResponse } from "src/features/movies/types/movie";
import { apiGet } from "src/shared/api/client";
import type { MovieDetailsResponse } from "src/features/movies/types/movieDetails";

export const getPopularMovies = (page: number) =>
  apiGet<MoviesResponse>(`/movie/popular?language=en-US&page=${page}`);

export const getMovieDetails = (id: number) =>
  apiGet<MovieDetailsResponse>(`/movie/${id}?language=en-US`);
