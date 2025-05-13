import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem("@todos");
      if (storedTodos) setTodos(JSON.parse(storedTodos));
    } catch (e) {
      console.error("Failed to load todos", e);
    }
  };

  const saveTodos = async (newTodos) => {
    try {
      await AsyncStorage.setItem("@todos", JSON.stringify(newTodos));
    } catch (e) {
      console.error("Failed to save todos", e);
    }
  };

  const addTodo = () => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
      };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      saveTodos(newTodos);
      setText("");
      Keyboard.dismiss();
    }
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const confirmClearAll = () => {
    if (todos.length === 0) return;

    Alert.alert(
      "Clear All Reminders",
      "Are you sure you want to delete all reminders?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: clearAllTodos },
      ],
    );
  };

  const clearAllTodos = async () => {
    await AsyncStorage.removeItem("@todos");
    setTodos([]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <BlurView intensity={90} style={styles.header}>
        <Text style={styles.headerTitle}>Reminderz</Text>
        {todos.length > 0 && (
          <TouchableOpacity
            onPress={confirmClearAll}
            style={styles.clearButton}
            activeOpacity={0.6}
          >
            <AntDesign name="delete" size={22} color="white" />
          </TouchableOpacity>
        )}
      </BlurView>

      {/* Input Container */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add a new reminder..."
          placeholderTextColor="#8E8E93"
          onSubmitEditing={addTodo}
          returnKeyType="done"
          blurOnSubmit={true}
          clearButtonMode="while-editing"
        />
        <TouchableOpacity
          onPress={addTodo}
          style={[styles.addButton, !text && styles.addButtonDisabled]}
          disabled={!text}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={28} color={text ? "#007AFF" : "#C7C7CC"} />
        </TouchableOpacity>
      </View>

      {/* Stats Bar */}
      {todos.length > 0 && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {todos.filter((todo) => todo.completed).length} of {todos.length}{" "}
            completed
          </Text>
        </View>
      )}

      {/* Todo List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-done-outline" size={48} color="#D1D1D6" />
            <Text style={styles.emptyStateText}>No reminders yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Add your first reminder above
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.todoItem}
            activeOpacity={0.8}
            onPress={() => toggleComplete(item.id)}
          >
            <View style={styles.checkbox}>
              <View
                style={[styles.circle, item.completed && styles.checkedCircle]}
              >
                {item.completed && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
            </View>

            <Text style={[styles.todoText, item.completed && styles.completed]}>
              {item.text}
            </Text>

            <TouchableOpacity
              onPress={() => deleteTodo(item.id)}
              style={styles.deleteButton}
              activeOpacity={0.6}
            >
              <Ionicons name="close" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 15,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1C1C1E",
    letterSpacing: -0.5,
  },
  clearButton: {
    backgroundColor: "#FF3B30",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
        shadowColor: "#000",
      },
    }),
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: "#1C1C1E",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 8,
  },
  statsText: {
    fontSize: 14,
    color: "#8E8E93",
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 30,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  checkbox: {
    marginRight: 12,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#D1D1D6",
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCircle: {
    backgroundColor: "#34C759",
    borderColor: "#34C759",
  },
  todoText: {
    flex: 1,
    fontSize: 17,
    color: "#1C1C1E",
    lineHeight: 22,
  },
  completed: {
    color: "#8E8E93",
    textDecorationLine: "line-through",
  },
  deleteButton: {
    marginLeft: 10,
    padding: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
  },
  emptyStateText: {
    fontSize: 18,
    color: "#8E8E93",
    fontWeight: "500",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#C7C7CC",
    marginTop: 4,
  },
});
