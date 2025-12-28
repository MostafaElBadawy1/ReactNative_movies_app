import { getMovieDetails } from "src/features/movies/api/movies.api";    
import type { MovieDetailsResponse } from "src/features/movies/types/movieDetails";
import { useQuery } from "@tanstack/react-query"; 

export function useMovieDetails(movieId: number) {
  return useQuery<MovieDetailsResponse>({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetails(movieId),
  });
}