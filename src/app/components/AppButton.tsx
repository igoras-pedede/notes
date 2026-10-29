import { colors, spacing } from "@/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";

type Button = {
  title: string;
  onPress: () => void;
};

export default function AppButton({ title, onPress }: Button) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: spacing.sm,
    borderColor: colors.border,
    borderWidth: 1,
    marginTop: 5,
  },
  pressed: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: spacing.lg,
  },
});
