import { MEALS } from "@/constants/meal";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function MealsScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>🍽️ Thực đơn</Text>
        <Text style={styles.subtitle}>{MEALS.length} món ăn gợi ý</Text>

        {MEALS.map((meal) => (
          <Pressable
            key={meal.id}
            style={styles.mealCard}
            onPress={() =>
              router.push({
                pathname: "/meal/[id]",
                params: { id: meal.id, name: meal.name },
              })
            }
          >
            <View style={styles.mealEmoji}>
              <Text style={styles.emojiText}>{meal.emoji}</Text>
            </View>
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealMeta}>
                ⭐ {meal.rating} • 🕐 {meal.time}
              </Text>
            </View>
            <View style={styles.mealCalBox}>
              <Text style={styles.mealCal}>{meal.calories}</Text>
              <Text style={styles.mealCalUnit}>kcal</Text>
            </View>
          </Pressable>
        ))}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#1a1a2e", marginTop: 8 },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4, marginBottom: 20 },
  mealCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  mealEmoji: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  emojiText: { fontSize: 26 },
  mealInfo: { flex: 1 },
  mealName: { fontSize: 16, fontWeight: "600", color: "#1a1a2e" },
  mealMeta: { fontSize: 13, color: "#9ca3af", marginTop: 4 },
  mealCalBox: { alignItems: "center" },
  mealCal: { fontSize: 18, fontWeight: "bold", color: "#4f46e5" },
  mealCalUnit: { fontSize: 11, color: "#9ca3af" },
});
