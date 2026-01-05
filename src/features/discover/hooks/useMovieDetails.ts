import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "src/features/discover/api/discover.api";
import type { MovieDetailsResponse } from "src/features/discover/types/movieDetails";

export function useMovieDetails(movieId: number) {
  return useQuery<MovieDetailsResponse>({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetails(movieId),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
