import { useQuery } from "@tanstack/react-query";
import { getTvShowDetails } from "src/features/discover/api/discover.api";
import { TvShowDetailsResponse } from "../types/tvShowDetails";

export function useTVShowDetails(tvShowId: number) {
  return useQuery<TvShowDetailsResponse>({
    queryKey: ["tvShow", tvShowId],
    queryFn: () => getTvShowDetails(tvShowId),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
