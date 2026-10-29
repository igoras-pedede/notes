import { colors, spacing } from "@/constants/theme";
import { useNotatkaStore } from "@/store/useNotatkaStore";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";

export default function AllNotes() {
  const wszystkie = useNotatkaStore((state) => state.notes);
  const clearNotes = useNotatkaStore((state) => state.clearNotes);

  return (
    <View style={styles.contaner}>
      <FlatList
        style={styles.textInput}
        data={wszystkie}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.note}
            onPress={() => router.push(`/notatka/${index}`)}
          >
            <Text style={styles.text}>
              Note {index + 1} : {item.tytul}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text>No Notes Added</Text>}
      />
      <View style={styles.buttonPlacement}>
        <Text>Number of Notes : {Number(wszystkie.length)}</Text>
        <AppButton title="Clear Notes" onPress={clearNotes} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    padding: spacing.md,
  },
  buttonPlacement: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md,
  },
  note: {
    backgroundColor: colors.card,
    padding: spacing.sm,
    borderRadius: 2,
    marginBottom: spacing.md,
  },
  text: {
    color: colors.background,
    fontSize: spacing.lg,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.background,
  },
});
