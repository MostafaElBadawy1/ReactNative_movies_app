import { useFavoritesStore } from "src/shared/store/favorites.store";
import type { Movie } from "src/features/movies/types/movie";
import { useToastStore } from "src/shared/store/toast.store";

export function useFavorites() {
  const favorites = useFavoritesStore((store) => store.favorites);
  const addFavorite = useFavoritesStore((store) => store.addFavorite);
  const removeFavorite = useFavoritesStore((store) => store.removeFavorite);
  const showToast = useToastStore((s) => s.show);

  const isFavorite = (movieId: number) =>
    favorites.some((movie) => movie.id === movieId);

  const toggleFavorite = (movie: Movie) => {
    const exists = isFavorite(movie.id);

    if (exists) {
      removeFavorite(movie.id);
      showToast("Removed from favorites", "info");
    } else {
      addFavorite(movie);
      showToast("Added to favorites ", "success");
    }
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}
