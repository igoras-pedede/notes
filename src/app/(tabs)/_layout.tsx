import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Nowa Notatka" }} />
      <Tabs.Screen name="notatki" options={{ title: "Szczegóły Notatek" }} />
      <Tabs.Screen
        name="networkScreen"
        options={{ title: "Zadania z Sieci" }}
      />
    </Tabs>
  );
}
