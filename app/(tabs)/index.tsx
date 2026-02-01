import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { useThemeColor } from "@/hooks/use-theme-color";
import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TodoScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <SafeAreaView style={{ backgroundColor }}>
      <TodoForm onCreated={() => setRefreshKey((k) => k + 1)} />
      <TodoList
        refreshKey={refreshKey}
        onRefresh={() => setRefreshKey((k) => k + 1)}
      />
    </SafeAreaView>
  );
}
