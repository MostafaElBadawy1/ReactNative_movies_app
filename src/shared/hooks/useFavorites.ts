import { useFavoritesStore } from "src/shared/store/favorites.store";
import type { Movie } from "src/features/movies/types/movie";

export function useFavorites() {
  const favorites = useFavoritesStore((store) => store.favorites);
  const addFavorite = useFavoritesStore((store) => store.addFavorite);
  const removeFavorite = useFavoritesStore((store) => store.removeFavorite);

  const isFavorite = (movieId: number) =>
    favorites.some((movie) => movie.id === movieId);

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}
