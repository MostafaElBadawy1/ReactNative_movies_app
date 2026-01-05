import { View, StyleSheet } from "react-native";

type Props = {
  width: number;
};

export default function MovieSkeletonItem({ width }: Props) {
  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.poster} />
      <View style={styles.title} />
      <View style={styles.subtitle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 8,
    backgroundColor: "#2A2A2A",
  },
  title: {
    marginTop: 8,
    height: 14,
    width: "80%",
    borderRadius: 4,
    backgroundColor: "#333",
  },
  subtitle: {
    marginTop: 6,
    height: 12,
    width: "60%",
    borderRadius: 4,
    backgroundColor: "#333",
  },
});
