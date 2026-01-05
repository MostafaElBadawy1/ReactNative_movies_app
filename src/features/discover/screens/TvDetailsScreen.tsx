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

import { GenresList } from "src/features/discover/components/GenresList";
import { useTVShowDetails } from "src/features/discover/hooks/useTvShowDetails";
import type { MediaStackParamList } from "src/navigation/types";
import { API_CONSTANTS } from "src/shared/constants/api";
import { useFavorites } from "src/shared/hooks/useFavorites";
import { colors } from "src/shared/theme/colors";

type Props = NativeStackScreenProps<MediaStackParamList, "TvDetails">;

const { POSTER_BASE_URL } = API_CONSTANTS;

export default function TvDetailsScreen({ route, navigation }: Props) {
  const { tvShowId } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data: tvShowDetails, isLoading } = useTVShowDetails(tvShowId);

  useEffect(() => {
    if (tvShowDetails?.name) {
      navigation.setOptions({ title: tvShowDetails.name });
    }
  }, [tvShowDetails?.name, navigation]);

  if (isLoading || !tvShowDetails) {
    return <ActivityIndicator style={{ marginTop: 20 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.posterWrapper}>
        <Image
          style={styles.poster}
          source={{ uri: `${POSTER_BASE_URL}${tvShowDetails.poster_path}` }}
        />

        <Ionicons
          name={isFavorite(tvShowDetails.id, "tv") ? "heart" : "heart-outline"}
          size={28}
          color={isFavorite(tvShowDetails.id, "tv") ? colors.errorToast : colors.yellow}
          style={styles.heart}
          onPress={() =>
            toggleFavorite({
              id: tvShowDetails.id,
              mediaType: "tv",
              poster_path: tvShowDetails.poster_path,
              name: tvShowDetails.name,
            })
          }
        />

        <Text style={styles.rate}>{tvShowDetails.vote_average.toFixed(1)}⭐️</Text>
      </View>

      <Text style={styles.title}>{tvShowDetails.name}</Text>

      {tvShowDetails.tagline && <Text style={styles.tagline}>{tvShowDetails.tagline}</Text>}

      <Text style={styles.meta}>
        {tvShowDetails.first_air_date} • {tvShowDetails.number_of_seasons} seasons •{" "}
        {tvShowDetails.number_of_episodes} episodes
      </Text>

      {tvShowDetails.genres?.length > 0 && <GenresList genres={tvShowDetails.genres} />}

      <Text style={styles.overview}>{tvShowDetails.overview}</Text>
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
