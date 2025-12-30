import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "src/features/movies/api/movies.api";
import type { MovieDetailsResponse } from "src/features/movies/types/movieDetails";

export function useMovieDetails(movieId: number) {
  return useQuery<MovieDetailsResponse>({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetails(movieId),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
