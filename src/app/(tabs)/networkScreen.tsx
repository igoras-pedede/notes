import { colors, spacing } from "@/constants/theme";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import AppButton from "../components/AppButton";

type Todo = { id: number; title: string; completed: boolean; userId: number };

export default function LoadNetworkScreen() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendingError, setSendingError] = useState("");
  const [serwerMessage, setSerwerMessage] = useState<Todo | null>(null);

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

  const sendPost = async () => {
    if (post === "" || isSending) {
      return;
    }
    setIsSending(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: post }),
        },
      );
      if (!response.ok) {
        throw new Error(`Błąd serwera : ${response.status}`);
      }
      setPost("");
      const data = await response.json();
      setSerwerMessage(data);
      setTimeout(() => {
        setSerwerMessage(null);
      }, 3000);
    } catch (err) {
      setSendingError("Nie udało się wysłać danych");
    } finally {
      setIsSending(false);
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
    <View style={styles.contaner}>
      <TextInput
        style={styles.textInput}
        value={post}
        onChangeText={setPost}
        placeholder="Wyślij zadanie"
      />
      {isSending && <Text>Sending...</Text>}
      {serwerMessage !== null && (
        <Text>
          Utworzono zadanie nr {serwerMessage.id}: {serwerMessage.title}
        </Text>
      )}
      {sendingError !== "" && <Text>{sendingError}</Text>}
      <AppButton title="Send" onPress={sendPost} />
      <FlatList
        style={styles.list}
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.text}>
            {item.id}: {item.title}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#000000",
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
  list: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.background,
    flex: 1,
  },
  contaner: {
    flex: 1,
  },
});
