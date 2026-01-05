export type MediaStackParamList = {
  Discover: undefined;
  MovieDetails: { movieId: number };
  TvDetails: { tvShowId: number };
};

export type SettingsStackParamList = {
  Settings: undefined;
};

export type FavoriteStackParamList = {
  Favorites: undefined;
  MovieDetails: { movieId: number };
  TvDetails: { tvShowId: number };
};

export type RootTabParamList = {
  DiscoverTab: undefined;
  FavoritesTab: undefined;
  SettingsTab: undefined;
};
