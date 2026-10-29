import { colors, spacing } from "@/constants/theme";
import { useNotatkaStore } from "@/store/useNotatkaStore";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";

export default function NotatkaDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const notatki = useNotatkaStore((state) => state.notes);
  const index = Number(id);
  const note = notatki[index];

  const remove = useNotatkaStore((state) => state.removeNote);

  const goBack = () => {
    router.back();
  };

  const Delete = () => {
    remove(index);
    router.back();
  };

  if (note === undefined) {
    return (
      <View>
        <Text>Nie znaleziono notatki</Text>
      </View>
    );
  }

  return (
    <View style={styles.contaner}>
      <View style={styles.titleCard}>
        <Text style={styles.tytuł}>Tytuł: {note.tytul}</Text>
      </View>
      <View style={styles.notesCard}>
        <Text style={styles.notatka}>Notatka: {note.notatka}</Text>
      </View>
      <View style={styles.buttonPlacement}>
        <View style={styles.button}>
          <AppButton title="<<<" onPress={goBack} />
        </View>
        <View style={styles.button}>
          <AppButton title="Usuń" onPress={Delete} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonPlacement: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    flex: 1,
  },
  tytuł: {
    color: colors.darkText,
    fontSize: spacing.vlg,
    fontWeight: "black",
    marginLeft: 50,
  },
  notatka: {
    marginTop: 20,
    color: colors.darkText,
    fontSize: spacing.lg,
    fontWeight: "light",
    marginLeft: 10,
  },
  contaner: {
    flex: 1,
    padding: spacing.md,
  },
  titleCard: {
    padding: 30,
    backgroundColor: colors.card,
    borderWidth: 3,
    borderColor: colors.border,
  },
  notesCard: {
    flex: 1,
    backgroundColor: "#47bfcc",
    borderWidth: 2,
    borderColor: colors.border,
  },
});
