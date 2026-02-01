import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

export default function TodoForm({ onCreated }: { onCreated?: () => void }) {
  const db = useSQLiteContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
        style={[
          styles.button,
          { backgroundColor: title && content ? "black" : "gray" },
        ]}
        onPress={async () => {
          if (!title || !content) return;
          await db.runAsync(
            "INSERT INTO todos (title, content) VALUES (?, ?)",
            [title, content],
          );
          setTitle("");
          setContent("");
          onCreated?.();
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
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonText: {
    color: "white",
    fontFamily: "font-noto-bold",
  },
});
