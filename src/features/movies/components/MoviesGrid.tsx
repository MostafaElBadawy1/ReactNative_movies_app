import { FlatList, useWindowDimensions } from "react-native";
import { useFavorites } from "src/shared/hooks/useFavorites";
import type { Movie } from "src/features/movies/types/movie";
import MovieItem from "src/features/movies/components/MovieItem";

const GAP = 12;

type Props = {
  movies: Movie[];
  onMoviePress: (movieId: number) => void;
  onEndReached?: () => void;
  isFetchingMore?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export default function MoviesGrid({
  movies,
  onMoviePress,
  onEndReached,
  refreshing = false,
  onRefresh
}: Props) {
  const { width } = useWindowDimensions();
  const { isFavorite, toggleFavorite } = useFavorites();

  const itemWidth = (width - GAP * 3) / 2;

  return (
    <FlatList
      data={movies}
      numColumns={2}
      keyExtractor={(item) => item?.id.toString()}
      columnWrapperStyle={{ gap: GAP, paddingHorizontal: GAP }}
      contentContainerStyle={{ paddingTop: GAP }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={({ item }) => (
        <MovieItem
          movie={item}
          width={itemWidth}
          isFavorite={isFavorite(item?.id)}
          onToggleFavorite={() => toggleFavorite(item)}
          onPress={() => onMoviePress(item?.id)}
        />
      )}
    />
  );
}
