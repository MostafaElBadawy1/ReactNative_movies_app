import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { useToastStore } from "../store/toast.store";
// import { useTheme } from "src/shared/hooks/useTheme";
import { colors } from "../theme/colors";

export default function Toast() {
const { visible, message, type, actionLabel, onAction, duration = 5000, hide } =
    useToastStore();

  //   const { isDark } = useTheme();
  //   const colors = isDark ? darkColors : lightColors;

  const translateY = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (!visible) return;

    Animated.timing(translateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();

   const timer = setTimeout(() => {
  Animated.timing(translateY, {
    toValue: 100,
    duration: 250,
    useNativeDriver: true,
  }).start(hide);
}, duration);


    return () => clearTimeout(timer);
  }, [visible, hide]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: type === "error" ? colors.errorToast : colors.successToast,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={[styles.text, { color: colors.white }]}>{message}</Text>

      {actionLabel && onAction && (
        <Pressable
          onPress={() => {
            hide();
            onAction();
          }}
        >
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "95%",
    position: "absolute",
    top: 50,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  text: {
    fontSize: 15,
    flex: 1,
  },
  action: {
    color: "#FFD54F",
    fontWeight: "700",
    fontSize: 14,
  },
});
