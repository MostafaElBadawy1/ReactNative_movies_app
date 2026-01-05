export type Media = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  name: string;
  first_air_date: string;
};

export type MediaResponse = {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
};
