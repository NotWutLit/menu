import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            title: "Quay lại",
          }}
        />
        <Stack.Screen
          name="bmi-result"
          options={{
            title: "Chi tiết BMI",
            headerBackTitle: "Quay lại",
            headerStyle: { backgroundColor: "#4f46e5" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="meal/[id]"
          options={{
            title: "Chi tiết món ăn",
            headerBackTitle: "Quay lại",
            headerStyle: { backgroundColor: "#4f46e5" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
