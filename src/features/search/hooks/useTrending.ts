import { useInfiniteQuery } from "@tanstack/react-query";
import type { MediaResponse } from "src/features/discover/types/media";
import { getTrendingMovies } from "src/features/search/api/search.api";
import type { ContentType } from "src/shared/types/content";

export function useTrendingMovies(contentType: ContentType) {
  return useInfiniteQuery<MediaResponse>({
    queryKey: ["trending", contentType],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getTrendingMovies(pageParam as number, contentType),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}
