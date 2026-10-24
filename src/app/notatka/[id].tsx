import { useNotatkaStore } from "@/store/useNotatkaStore";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function NotatkaDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const notatki = useNotatkaStore((state) => state.notes);
  const index = Number(id);
  const note = notatki[index];

  const remove = useNotatkaStore((state) => state.removeNote);

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
    <View>
      <Text>Notatka: {note.notatka}</Text>
      <Button title="Usuń" onPress={Delete} />
    </View>
  );
}
