import { FlatList, useWindowDimensions } from "react-native";
import MediaItem from "src/features/discover/components/MediaItem";
import type { MediaPreview } from "../types/mediaPreview";

const GAP = 12;

type Props = {
  favorites?: unknown;
  mediaList: MediaPreview[];
  onItemPress: (itemId: number) => void;
  isFavorite: (itemId: number) => boolean;
  onToggleFavorite: (item: MediaPreview) => void;
  onEndReached?: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export default function MediaGrid({
  mediaList,
  favorites,
  onItemPress,
  isFavorite,
  onToggleFavorite,
  onEndReached,
  refreshing = false,
  onRefresh,
}: Props) {
  const { width } = useWindowDimensions();
  const itemWidth = (width - GAP * 3) / 2;

  return (
    <FlatList
      data={mediaList}
      extraData={favorites}  
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      columnWrapperStyle={{ gap: GAP, paddingHorizontal: GAP }}
      contentContainerStyle={{ paddingTop: GAP }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={({ item }) => (
        <MediaItem
          movie={item}
          width={itemWidth}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={() => onToggleFavorite(item)}
          onPress={() => onItemPress(item.id)}
        />
      )}
    />
  );
}
