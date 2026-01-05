import { apiGet } from "src/shared/api/client";
import type { MediaResponse } from "../types/media";
import { TvShowDetailsResponse } from '../types/tvShowDetails';

export const getPopularTvShows = (page: number) =>
  apiGet<MediaResponse>(`/tv/popular?language=en-US&page=${page}`);

export const getTvShowDetails = (id: number) =>
  apiGet<TvShowDetailsResponse>(`/tv/${id}?language=en-US`);
