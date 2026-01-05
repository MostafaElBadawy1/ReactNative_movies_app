import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { Media } from "src/features/discover/types/media";
import { API_CONSTANTS } from "src/shared/constants/api";
import { colors } from "src/shared/theme/colors";
import type { MediaPreview } from "../types/mediaPreview";

const { POSTER_BASE_URL } = API_CONSTANTS;

type Props = {
  movie: MediaPreview;
  width: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPress: () => void;
};

export default function MovieItem({
  movie,
  onPress,
  onToggleFavorite,
  isFavorite,
  width,
}: Props) {
  if (!movie) {
    return null;
  }
  const title = movie.title ?? movie.name;
  const releaseDate = movie.release_date ?? movie.first_air_date;
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
            color={isFavorite ? colors.errorToast : colors.yellow}
          />
        </Pressable>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      <Text style={styles.title} numberOfLines={1}>
        {releaseDate}
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
