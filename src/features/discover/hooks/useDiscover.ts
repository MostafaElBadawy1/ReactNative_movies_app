import { useInfiniteQuery } from "@tanstack/react-query";
import type { ContentType } from "src/features/discover/types/content";
import { getPopularMovies } from "../api/movies.api";
import { getPopularTvShows } from "../api/tv.api";
import type { MediaResponse } from "../types/media";

export function useDiscover(type: ContentType) {
  return useInfiniteQuery<MediaResponse>({
    queryKey: ["discover", type],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return type === "movie"
        ? getPopularMovies(pageParam as number)
        : getPopularTvShows(pageParam as number);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}
