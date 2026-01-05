import type { MediaResponse } from "src/features/discover/types/media";
import type { MovieDetailsResponse } from "src/features/discover/types/movieDetails";
import { TvShowDetailsResponse } from "../types/tvShowDetails";

import { apiGet } from "src/shared/api/client";
import { ContentType } from "../../../shared/types/content";

export const getDiscover = (
  contentType: ContentType,
  filter: "popular" | "top_rated",
  page: number
) =>
  apiGet<MediaResponse>(
    `/${contentType}/${filter}?language=en-US&page=${page}`
  );

export const getMovieDetails = (id: number) =>
  apiGet<MovieDetailsResponse>(`/movie/${id}?language=en-US`);

export const getTvShowDetails = (id: number) =>
  apiGet<TvShowDetailsResponse>(`/tv/${id}?language=en-US`);
