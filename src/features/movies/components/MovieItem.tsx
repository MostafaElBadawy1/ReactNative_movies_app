import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { Movie } from "src/features/movies/types/movie";
import { colors } from "src/shared/theme/colors";

type Props = {
  movie: Movie;
  isFavorite?: boolean;
  onPress: () => void;
  onToggleFavorite?: () => void;
  width: number;
};

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieItem({
  movie,
  onPress,
  onToggleFavorite,
  isFavorite,
  width,
}: Props) {
  return (
    <Pressable style={[styles.container, { width }]} onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image
          source={
            movie.poster_path
              ? { uri: `${POSTER_BASE_URL}${movie.poster_path}` }
              : undefined
          }
          style={styles.poster}
        />

        <Pressable style={styles.heart} onPress={onToggleFavorite} hitSlop={8}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite ? colors.red : colors.yellow}
          />
        </Pressable>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {movie.title}
      </Text>

      <Text style={styles.title} numberOfLines={1}>
        {movie.release_date}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 8,
  },
  imageWrapper: {
    position: "relative",
  },
  title: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  heart: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: colors.heartBackground,
    borderRadius: 16,
    padding: 6,
  },
});
