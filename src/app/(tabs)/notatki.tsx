import { useNotatkaStore } from "@/store/useNotatkaStore";
import { router } from "expo-router";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AllNotes() {
  const wszystkie = useNotatkaStore((state) => state.notes);
  const clearNotes = useNotatkaStore((state) => state.clearNotes);

  return (
    <View style={styles.contaner}>
      <FlatList
        data={wszystkie}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.note}
            onPress={() => router.push(`/notatka/${index}`)}
          >
            <Text style={styles.text}>
              Note {index + 1} : {item.tytuł}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text>No Notes Added</Text>}
      />
      <View style={styles.buttonPlacement}>
        <Text>Number of Notes : {Number(wszystkie.length)}</Text>
        <Button title="Clear Notes" onPress={clearNotes} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    padding: 10,
  },
  buttonPlacement: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  note: {
    backgroundColor: "#011b59",
    padding: 8,
    borderRadius: 2,
    marginBottom: 10,
  },
  text: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
