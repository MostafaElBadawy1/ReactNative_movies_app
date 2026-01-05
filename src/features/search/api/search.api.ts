import type { MediaResponse } from "src/features/discover/types/media";
import { apiGet } from "src/shared/api/client";
import { ContentType } from "src/shared/types/content";

export const getTrendingMovies = (page: number, contentType: ContentType) =>
  apiGet<MediaResponse>(
    `/trending/${contentType}/day?language=en-US&page=${page}`
  );

export const getSearch = (
  query: string,
  page: number,
  contentType: ContentType
) =>
  apiGet<MediaResponse>(
    `/search/${contentType}?query=${encodeURIComponent(query)}&language=en-US&page=${page}`
  );
