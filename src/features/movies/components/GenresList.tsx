import { FlatList } from "react-native";
import { GenreTag } from "src/features/movies/components/GenreTag";

export function GenresList({ genres }) {
  return (
    <FlatList
      data={genres}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      style={{ marginTop: 12 }}   
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <GenreTag name={item.name} />
      )}
    />
  );
}
