import { useFavoritesStore } from "src/shared/store/favorites.store";
import { useToastStore } from "src/shared/store/toast.store";
import type { FavoriteMedia } from "src/shared/types/favoriteMedia";

export function useFavorites() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
  const isFavoriteStore = useFavoritesStore((s) => s.isFavorite);

  const showToast = useToastStore((s) => s.show);

  const isFavorite = (id: number, mediaType: FavoriteMedia["mediaType"]) =>
    isFavoriteStore(id, mediaType);

  const toggleFavorite = (item: FavoriteMedia) => {
    const exists = isFavorite(item.id, item.mediaType);

    if (exists) {
      removeFavorite(item.id, item.mediaType);
      showToast("Removed from favorites", "info");
    } else {
      addFavorite(item);
      showToast("Added to favorites", "success");
    }
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}
