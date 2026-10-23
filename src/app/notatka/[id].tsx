import { useNotatkaStore } from "@/store/useNotatkaStore";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function NotatkaDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const notatki = useNotatkaStore((state) => state.notes);
  const index = Number(id);
  const note = notatki[index];

  if (note === undefined) {
    return (
      <View>
        <Text>Nie znaleziono notatki</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Notatka: {note}</Text>
    </View>
  );
}
