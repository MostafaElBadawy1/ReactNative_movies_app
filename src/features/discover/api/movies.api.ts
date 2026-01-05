import type { MediaResponse } from "src/features/discover/types/media";
import type { MovieDetailsResponse } from "src/features/discover/types/movieDetails";
import { apiGet } from "src/shared/api/client";

export const getPopularMovies = (page: number) =>
  apiGet<MediaResponse>(`/movie/popular?language=en-US&page=${page}`);

export const getMovieDetails = (id: number) =>
  apiGet<MovieDetailsResponse>(`/movie/${id}?language=en-US`);
