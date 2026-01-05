import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View } from "react-native";
import MediaGrid from "src/features/discover/components/MediaGrid";
import MoviesSkeletonGrid from "src/features/discover/components/MediaSkeletonGrid";
import type { ContentType } from "src/features/discover/types/content";
import type { MediaStackParamList } from "src/navigation/types";
import { colors } from "src/shared/theme/colors";
import ContentSwitcher from "../components/ContentSwitcher";
import { useDiscover } from "../hooks/useDiscover";
import { useFavorites } from "src/shared/hooks/useFavorites";

type Props = NativeStackScreenProps<MediaStackParamList, "Discover">;

export default function DiscoverScreen({ navigation }: Props) {
  const [contentType, setType] = useState<ContentType>("movie");
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useDiscover(contentType);

  if (isLoading && !data) {
    return <MoviesSkeletonGrid />;
  }

  if (isError) {
    return null;
  }

  const media = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <ContentSwitcher value={contentType} onChange={setType} />

      <MediaGrid
        favorites={favorites} 
        mediaList={media}
        isFavorite={(id) => isFavorite(id, contentType)}
        onToggleFavorite={(item) =>
          toggleFavorite({
            id: item.id,
            mediaType: contentType,
            poster_path: item.poster_path,
            title: item.title,
            name: item.name,
          })
        }
        onItemPress={(id) => {
          if (contentType === "movie") {
            navigation.navigate("MovieDetails", { movieId: id });
          } else {
            navigation.navigate("TvDetails", { tvShowId: id });
          }
        }}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </View>
  );
}

