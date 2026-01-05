import { Pressable, StyleSheet, Text, View } from "react-native";
import type { ContentType } from "src/shared/types/content";

type Props = {
  value: ContentType;
  onChange: (value: ContentType) => void;
};

export default function ContentSwitcher({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {(["movie", "tv"] as ContentType[]).map((type) => {
        const isActive = value === type;
        return (
          <Pressable
            key={type}
            onPress={() => onChange(type)}
            style={[styles.item, isActive && styles.activeItem]}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {type === "movie" ? "Movies" : "TV Shows"}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  item: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#aaa",
  },
  activeItem: {
    backgroundColor: "#E50914",
  },
  text: {
    color: "#222",
    fontWeight: "600",
  },
  activeText: {
    color: "#fff",
  },
});
