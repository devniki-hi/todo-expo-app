import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Todo } from "@/types/Todo";
import { useSQLiteContext } from "expo-sqlite";

export default function TodoItem(props: Todo & { onDeleted?: () => void }) {
  const { onDeleted, ...todo } = props;
  const db = useSQLiteContext();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editContent, setEditContent] = useState(todo.content);

  const updateTodo = async () => {
    if (!editTitle || !editContent) return;
    await db.runAsync("UPDATE todos SET title = ?, content = ? WHERE id = ?", [
      editTitle,
      editContent,
      todo.id as number,
    ]);
    setEditModalVisible(false);
    onDeleted?.();
  };

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
    <>
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={0.5}
        style={styles.container}
        onPress={() => {
          setEditTitle(todo.title);
          setEditContent(todo.content);
          setEditModalVisible(true);
        }}
        onLongPress={() => {
          deleteTodoAlert();
        }}
      >
        <Text>
          {todo.title}-{todo.content}
        </Text>
      </TouchableHighlight>

      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Todoを編集</Text>
            <TextInput
              style={styles.input}
              placeholder="タイトルを入力"
              value={editTitle}
              onChangeText={setEditTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="内容を入力"
              value={editContent}
              onChangeText={setEditContent}
            />
            <View style={styles.modalButtons}>
              <TouchableHighlight
                style={[styles.button, { backgroundColor: "gray" }]}
                onPress={() => setEditModalVisible(false)}
                activeOpacity={0.5}
                underlayColor="#DDDDDD"
              >
                <Text style={styles.buttonText}>キャンセル</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      editTitle && editContent ? "black" : "gray",
                  },
                ]}
                onPress={updateTodo}
                activeOpacity={0.5}
                underlayColor="#DDDDDD"
              >
                <Text style={styles.buttonText}>保存</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d1d5db",
    margin: 8,
    padding: 8,
    borderRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "85%",
    gap: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "font-noto-bold",
    textAlign: "center",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 2,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 8,
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontFamily: "font-noto-bold",
  },
});
