import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Todo } from "@/types/Todo";
import TodoItem from "./todo-item";

export default function TodoList({
  refreshKey,
  onRefresh,
}: {
  refreshKey: number;
  onRefresh?: () => void;
}) {
  const db = useSQLiteContext();
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    async function getAllTodos() {
      try {
        const results = await db.getAllAsync<Todo>("SELECT * FROM todos");
        setTodos(results);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    getAllTodos();
  }, [refreshKey]);

  return (
    <View>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          content={todo.content}
          onDeleted={onRefresh}
        />
      ))}
    </View>
  );
}
