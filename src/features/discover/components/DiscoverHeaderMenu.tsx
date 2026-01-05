import { Pressable, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { DiscoverFilter } from "../types/discoverFilter";

type Props = {
  value: DiscoverFilter;
  onChange: (value: DiscoverFilter) => void;
};

export default function DiscoverHeaderMenu({
  value,
  onChange,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          onChange(value === "popular" ? "top_rated" : "popular")
        }
        style={styles.button}
      >
        <Text style={styles.text}>
          {value === "popular" ? "Popular" : "Top Rated"}
        </Text>
        <Ionicons name="chevron-down" size={16} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  text: {
    fontWeight: "600",
  },
});
