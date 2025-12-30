import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import MoviesGrid from "src/features/movies/components/MoviesGrid";
import type { FavoriteStackParamList } from "src/navigation/types";
import { useFavorites } from "src/shared/hooks/useFavorites";

type Props = NativeStackScreenProps<FavoriteStackParamList, "Favorites">;

export default function FavoritesScreen({ navigation }: Props) {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        No favorites yet
      </Text>
    );
  }

  return (
    <MoviesGrid
      movies={favorites}
      onMoviePress={(movieId) =>
        navigation.navigate("MovieDetails", { movieId })
      }
    />
  );
}
