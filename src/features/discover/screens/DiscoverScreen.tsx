import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { useDiscover } from "src/features/discover//hooks/useDiscover";
import ContentSwitcher from "src/features/discover/components/ContentSwitcher";
import DiscoverHeaderMenu from "src/features/discover/components/DiscoverHeaderMenu";
import MediaGrid from "src/features/discover/components/MediaGrid";
import MoviesSkeletonGrid from "src/features/discover/components/MediaSkeletonGrid";
import { DiscoverFilter } from "src/features/discover/types/discoverFilter";
import type { MediaStackParamList } from "src/navigation/types";
import { useFavorites } from "src/shared/hooks/useFavorites";
import { useContentTypeStore } from "src/shared/store/discover.store";
import { colors } from "src/shared/theme/colors";

type Props = NativeStackScreenProps<MediaStackParamList, "Discover">;

export default function DiscoverScreen({ navigation }: Props) {
  const contentType = useContentTypeStore((s) => s.contentType);
  const setType = useContentTypeStore((s) => s.setContentType);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [filter, setFilter] = useState<DiscoverFilter>("popular");
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useDiscover(contentType, filter);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DiscoverHeaderMenu value={filter} onChange={setFilter} />
      ),
      title: contentType === "movie" ? "Movies" : "TV Shows",
    });
  }, [navigation, filter, contentType]);

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
