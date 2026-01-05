import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import ContentSwitcher from "src/features/discover/components/ContentSwitcher";
import MediaGrid from "src/features/discover/components/MediaGrid";
import type { MediaPreview } from "src/features/discover/types/mediaPreview";
import SearchBar from "src/features/search/components/SearchBar";
import { useSearchInput } from "src/features/search/hooks/useSearchInput";
import { useTrendingMovies } from "src/features/search/hooks/useTrending";
import { SearchStackParamList } from "src/navigation/types";
import { useFavorites } from "src/shared/hooks/useFavorites";
import { useContentTypeStore } from "src/shared/store/discover.store";
import { useSearch } from "../hooks/useSearch";

type Props = NativeStackScreenProps<SearchStackParamList, "Search">;

export default function SearchScreen({ navigation }: Props) {
  const { query, setQuery, debouncedQuery, isSearching, clear } =
    useSearchInput(500);

  const contentType = useContentTypeStore((s) => s.contentType);
  const setType = useContentTypeStore((s) => s.setContentType);

  const searchQuery = useSearch(debouncedQuery, contentType);
  const trendingQuery = useTrendingMovies(contentType);
  const activeQuery = isSearching ? searchQuery : trendingQuery;

  const mediaList: MediaPreview[] =
    activeQuery.data?.pages.flatMap((p) => p.results) ?? [];

  const { isFavorite, toggleFavorite } = useFavorites();
  const searchPlaceholder =
    contentType === "movie" ? "Search for Movies" : "Search for TV shows";

  return (
    <View style={styles.container}>
      <ContentSwitcher value={contentType} onChange={setType} />

      <SearchBar
        value={query}
        onChangeText={setQuery}
        onClear={clear}
        placeholder={searchPlaceholder}
      />

      {activeQuery.isLoading && <ActivityIndicator style={{ marginTop: 24 }} />}

      <MediaGrid
        mediaList={mediaList}
        onItemPress={(id) => {
          if (contentType === "movie") {
            navigation.navigate("MovieDetails", { movieId: id });
          } else {
            navigation.navigate("TvDetails", { tvShowId: id });
          }
        }}
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
        onEndReached={() => {
          if (activeQuery.hasNextPage && !activeQuery.isFetchingNextPage) {
            activeQuery.fetchNextPage();
          }
        }}
      />

      {activeQuery.isFetchingNextPage && (
        <ActivityIndicator style={{ marginVertical: 16 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
