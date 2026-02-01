import { API_URL } from "@/constants/urls";
import { Todo } from "@/types/Todo";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export default function TodoItem({ id, title, content }: Todo) {
  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  return (
    <View style={styles.todoItem}>
      <Text style={[styles.textBase, styles.textTitle]}>{title}</Text>
      <Text style={[styles.textBase, styles.textContent]}>{content}</Text>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          deleteTodo(id!);
        }}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
      >
        <Text style={styles.buttonText}>削除</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 1,
  },
  textBase: {
    fontFamily: "font-noto-bold",
    textAlign: "center",
  },
  textTitle: {
    width: "30%",
  },
  textContent: {
    width: "50%",
  },
  button: {
    width: "15%",
    backgroundColor: "red",
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "font-noto-bold",
  },
});
