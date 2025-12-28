import { StyleSheet, Text, View } from "react-native";

export function GenreTag({ name }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#606d7fff",
    borderRadius: 16,
    marginRight: 8,
  },
  text: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
});
