import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import AppButton from "../components/AppButton";

export default function LoadNetworkScreen() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadTodos = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
      );
      if (!response.ok) {
        throw new Error(`Bład serwera : ${response.status}`);
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError("Nie udało się pobrać danych");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (isLoading === true) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error !== "") {
    return (
      <View>
        <Text>{error}</Text>
        <AppButton title="Load again" onPress={loadTodos} />
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text>
          {item.id}: {item.title}
        </Text>
      )}
    />
  );
}
