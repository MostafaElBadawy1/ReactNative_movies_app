import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import MediaGrid from "src/features/discover/components/MediaGrid";
import { MediaPreview } from "src/features/discover/types/mediaPreview";
import type { FavoriteStackParamList } from "src/navigation/types";
import { useFavorites } from "src/shared/hooks/useFavorites";

type Props = NativeStackScreenProps<FavoriteStackParamList, "Favorites">;

export default function FavoritesScreen({ navigation }: Props) {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        No favorites yet
      </Text>
    );
  }

  const mediaList: MediaPreview[] = favorites.map((f) => ({
    id: f.id,
    poster_path: f.poster_path,
    title: f.title,
    name: f.name,
  }));

  return (
    <MediaGrid
      mediaList={mediaList}
      isFavorite={(id) => favorites.some((f) => f.id === id)}
      onToggleFavorite={(item) => {
        const favorite = favorites.find((f) => f.id === item.id);
        if (favorite) toggleFavorite(favorite);
      }}
      onItemPress={(id) => {
        const favorite = favorites.find((f) => f.id === id);
        if (!favorite) return;

        favorite.mediaType === "movie"
          ? navigation.navigate("MovieDetails", { movieId: id })
          : navigation.navigate("TvDetails", { tvShowId: id });
      }}
    />
  );
}
