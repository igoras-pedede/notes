import { useNotatkaStore } from "@/store/useNotatkaStore";
import { router } from "expo-router";
import { Button, FlatList, Pressable, Text, View } from "react-native";

export default function AllNotes() {
  const wszystkie = useNotatkaStore((state) => state.notes);
  const clearNotes = useNotatkaStore((state) => state.clearNotes);

  return (
    <View>
      <FlatList
        data={wszystkie}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => router.push(`/notatka/${index}`)}>
            <Text>
              Note {index + 1} : {item.tytuł}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text>No Notes Added</Text>}
      />
      <Button title="Clear Notes" onPress={clearNotes} />
      <Text>Number of Notes : {Number(wszystkie.length)}</Text>
    </View>
  );
}
