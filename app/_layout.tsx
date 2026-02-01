import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { migrateDbIfNeeded } from "@/utils/db";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName="todo.db" onInit={migrateDbIfNeeded}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ title: "My Todo App", headerShown: false }}
          />
        </Stack>
        <StatusBar style="auto" />
      </SQLiteProvider>
    </ThemeProvider>
  );
}
