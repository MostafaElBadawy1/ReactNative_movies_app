import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

type Props = {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
};

export default function SearchBar({
  value,
  placeholder = "",
  onChangeText,
  onClear,
}: Props) {
  return (
    <View style={styles.searchBox}>
      <Ionicons name="search" size={20} color="#aaa" />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />

      {value.length > 0 && (
        <Pressable onPress={onClear}>
          <Ionicons
            name="close-circle"
            size={18}
            color="#aaa"
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f7",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
    gap: 8,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  input: {
    flex: 1,
    color: "#111",
    fontSize: 16,
  },
});
