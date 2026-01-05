import { useInfiniteQuery } from "@tanstack/react-query";
import type { MediaResponse } from "src/features/discover/types/media";
import { getSearch } from "src/features/search/api/search.api";
import type { ContentType } from "src/shared/types/content";

export function useSearch(query: string, contentType: ContentType) {
  return useInfiniteQuery<MediaResponse>({
    queryKey: ["search", query, contentType],

    enabled: query.trim().length > 0,

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      getSearch(query, pageParam as number, contentType),

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}
