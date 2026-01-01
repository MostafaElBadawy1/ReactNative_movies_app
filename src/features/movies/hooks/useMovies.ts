import { useInfiniteQuery } from "@tanstack/react-query";
import { getPopularMovies } from "src/features/movies/api/movies.api";
import type { MoviesResponse } from "src/features/movies/types/movie";

export function useMovies() {
  return useInfiniteQuery<MoviesResponse>({
    queryKey: ["movies", "popular"],
    initialPageParam: 1,
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    queryFn: ({ pageParam }) => getPopularMovies(pageParam as number),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined,
  });
}
