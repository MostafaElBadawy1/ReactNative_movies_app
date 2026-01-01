import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import MoviesGrid from "src/features/movies/components/MoviesGrid";
import MoviesSkeletonGrid from "src/features/movies/components/MoviesSkeletonGrid";
import { useMovies } from "src/features/movies/hooks/useMovies";
import type { MoviesStackParamList } from "src/navigation/types";
import { colors } from "src/shared/theme/colors";

type Props = NativeStackScreenProps<MoviesStackParamList, "MoviesHome">;

export default function MoviesHomeScreen({ navigation }: Props) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useMovies();

  if (isLoading && !isError) {
    return <MoviesSkeletonGrid />;
  }

  if (isError) {
    return null;
  }

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MoviesGrid
        movies={movies}
        onMoviePress={(movieId) =>
          navigation.navigate("MovieDetails", { movieId })
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        isFetchingMore={isFetchingNextPage}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </View>
  );
}
