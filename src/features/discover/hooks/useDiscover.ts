import { useInfiniteQuery } from "@tanstack/react-query";
import type { ContentType } from "src/shared/types/content";
import { getDiscover } from "../api/discover.api";
import type { DiscoverFilter } from "../types/discoverFilter";
import type { MediaResponse } from "../types/media";

export function useDiscover(
  contentType: ContentType | undefined,
  filter: DiscoverFilter | undefined
) {
  return useInfiniteQuery<MediaResponse>({
    queryKey: ["discover", contentType, filter],

    enabled: Boolean(contentType && filter),

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      getDiscover(contentType!, filter!, pageParam as number),

    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;

      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
}
