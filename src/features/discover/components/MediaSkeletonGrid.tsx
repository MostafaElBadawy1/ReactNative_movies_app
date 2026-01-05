import { FlatList, useWindowDimensions } from "react-native";
import MovieSkeletonItem from "./MediaSkeletonItem";

const GAP = 12;
const SKELETON_COUNT = 6;

export default function MoviesSkeletonGrid() {
  const { width } = useWindowDimensions();
  const itemWidth = (width - GAP * 3) / 2;

  return (
    <FlatList
      data={Array.from({ length: SKELETON_COUNT })}
      numColumns={2}
      keyExtractor={(_, index) => index.toString()}
      columnWrapperStyle={{ gap: GAP }}
      contentContainerStyle={{
        paddingTop: GAP,
        paddingHorizontal: GAP,
      }}
      renderItem={() => (
        <MovieSkeletonItem width={itemWidth} />
      )}
    />
  );
}
