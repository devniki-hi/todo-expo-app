import { API_URL } from "@/constants/urls";
import { Todo } from "@/types/Todo";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createTodo = async ({ title, content }: Todo) => {
    try {
      const response = await fetch(`${API_URL}/api/todos`, {
        method: "POST",
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
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="タイトルを入力"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="内容を入力"
        value={content}
        onChangeText={setContent}
      />
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          if (!title || !content) return;
          createTodo({ title, content });
          setTitle("");
          setContent("");
        }}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
      >
        <Text style={styles.buttonText}>作成</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: { marginBottom: 8, gap: 8 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 2,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  button: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonText: {
    color: "white",
    fontFamily: "font-noto-bold",
  },
});
