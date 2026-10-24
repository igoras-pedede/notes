import { useNotatkaStore } from "@/store/useNotatkaStore";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";

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
        value={tytuł}
        onChangeText={setTytuł}
        placeholder="Wpisz Tytuł"
      />
      <TextInput
        value={notatka}
        onChangeText={setNotatka}
        placeholder="Wpisz Swoją Notatekę"
      />
      <Button
        title="Zapisz"
        onPress={() =>
          addNotes({
            tytuł: tytuł,
            notatka: notatka,
          })
        }
      />
      <Button title="Clear" onPress={clearNotes} />
    </View>
  );
}
