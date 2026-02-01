import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from "react-native";
import React from "react";
import { Todo } from "@/types/Todo";
import { useSQLiteContext } from "expo-sqlite";

export default function TodoItem(props: Todo & { onDeleted?: () => void }) {
  const { onDeleted, ...todo } = props;
  const db = useSQLiteContext();
  const deleteTodoAlert = () => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await db.runAsync("DELETE FROM todos WHERE id = ?", [
            todo.id as number,
          ]);
          onDeleted?.();
        },
      },
    ]);
  };
  return (
    <TouchableHighlight
      underlayColor="transparent"
      activeOpacity={0.5}
      style={styles.container}
      onLongPress={() => {
        deleteTodoAlert();
      }}
    >
      <Text>
        {todo.title}-{todo.content}
      </Text>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d1d5db", // Using a gray-300 equivalent color
    margin: 8,
    padding: 8,
    borderRadius: 4,
  },
});
