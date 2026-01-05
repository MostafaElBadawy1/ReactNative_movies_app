export type RootTabParamList = {
  DiscoverTab: undefined;
  SearchTab: undefined;
  FavoritesTab: undefined;
  SettingsTab: undefined;
};

export type MediaStackParamList = {
  Discover: undefined;
  MovieDetails: { movieId: number };
  TvDetails: { tvShowId: number };
};

export type SearchStackParamList = {
  Search: undefined;
  MovieDetails: { movieId: number };
  TvDetails: { tvShowId: number };
};

export type FavoriteStackParamList = {
  Favorites: undefined;
  MovieDetails: { movieId: number };
  TvDetails: { tvShowId: number };
};

export type SettingsStackParamList = {
  Settings: undefined;
};
