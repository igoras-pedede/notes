import { colors, spacing } from "@/constants/theme";
import { useNotatkaStore } from "@/store/useNotatkaStore";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import AppButton from "../components/AppButton";

export default function NowaNotatka() {
  const [tytuł, setTytuł] = useState("");
  const [notatka, setNotatka] = useState("");

  const addNotes = useNotatkaStore((state) => state.addNotes);
  const clearNotes = () => {
    setTytuł("");
    setNotatka("");
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        value={tytuł}
        onChangeText={setTytuł}
        placeholder="Wpisz Tytuł"
      />
      <TextInput
        style={styles.textInput}
        value={notatka}
        onChangeText={setNotatka}
        placeholder="Wpisz Swoją Notatekę"
      />
      <View style={styles.buttonPlacement}>
        <AppButton
          title="Zapisz"
          onPress={() =>
            addNotes({
              tytul: tytuł,
              notatka: notatka,
            })
          }
        />
        <AppButton title="Clear" onPress={clearNotes} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.background,
    marginBottom: spacing.sm,
  },
  buttonPlacement: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
});
