import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GenresList } from "src/features/movies/components/GenresList";
import { useMovieDetails } from "src/features/movies/hooks/useMovieDetails";
import type { MoviesStackParamList } from "src/navigation/types";
import { useFavorites } from "src/shared/hooks/useFavorites";
import { colors } from "src/shared/theme/colors";

type Props = NativeStackScreenProps<MoviesStackParamList, "MovieDetails">;
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailsScreen({ route, navigation }: Props) {
  const { movieId } = route.params;

  const { isFavorite, toggleFavorite } = useFavorites();
  const { data: movieDetails, isLoading, error } = useMovieDetails(movieId);

  useEffect(() => {
    if (movieDetails?.title) {
      navigation.setOptions({
        title: movieDetails.title,
      });
    }
  }, [movieDetails?.title, navigation]);

  if (isLoading || !movieDetails) {
    return <ActivityIndicator style={{ marginTop: 20 }} />;
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.posterWrapper}>
        <Image
          style={styles.poster}
          source={{ uri: `${POSTER_BASE_URL}${movieDetails.poster_path}` }}
        />
        <Ionicons
          name={isFavorite(movieDetails.id) ? "heart" : "heart-outline"}
          size={28}
          color={
            isFavorite(movieDetails.id) ? colors.errorToast : colors.yellow
          }
          style={styles.heart}
          onPress={() => toggleFavorite(movieDetails)}
        />
        <Text style={styles.rate}>{movieDetails.vote_average}⭐️</Text>
      </View>
      <Text style={styles.title}>{movieDetails.title} </Text>
      {movieDetails.tagline && (
        <Text style={styles.tagline}>{movieDetails.tagline}</Text>
      )}

      <Text style={styles.meta}>
        {movieDetails.release_date} • {movieDetails.runtime} min •{" "}
        {movieDetails.popularity} Views
      </Text>
      {movieDetails.genres?.length > 0 && (
        <GenresList genres={movieDetails.genres} />
      )}

      <Text style={styles.overview}>{movieDetails.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  posterWrapper: {
    position: "relative",
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 12,
  },
  heart: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: colors.heartBackground,
    borderRadius: 20,
    padding: 6,
  },
  rate: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: colors.heartBackground,
    color: colors.white,
    borderRadius: 20,
    padding: 6,
    fontWeight: "700",
  },
  title: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },
  tagline: {
    marginTop: 4,
    fontSize: 18,
    color: colors.text,
  },
  meta: {
    marginTop: 6,
    color: colors.gray,
  },
  overview: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
  },
});
