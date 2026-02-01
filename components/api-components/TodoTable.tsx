import { Todo } from "@/types/Todo";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";
import { API_URL } from "@/constants/urls";
export default function TodoTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Todo[]>([]);

  const getTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/api/todos`);
      const todos = await response.json();
      setData(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <View style={styles.todoHeader}>
        <Text style={[styles.textBase, styles.textTitle]}>タイトル</Text>
        <Text style={[styles.textBase, styles.textContent]}>内容</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TodoItem id={item.id} title={item.title} content={item.content} />
          )}
          keyExtractor={(item) =>
            item.id!.toString() || Math.random().toString()
          }
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  todoHeader: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderBottomColor: "gray",
    paddingVertical: 2,
  },

  textBase: {
    fontFamily: "font-noto-bold",
    textAlign: "center",
  },
  textTitle: {
    width: "33%",
  },
  textContent: {
    width: "66%",
  },
  todoItem: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 1,
  },
});
