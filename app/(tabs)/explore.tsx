import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HealthHomeScreen() {
  const bmiData = { value: 22.5, category: "Bình thường", color: "#22c55e" };

  const handleViewBMI = () => {
    router.push({
      pathname: "/bmi-result",
      params: {
        bmi: "22.5",
        height: "170",
        weight: "65",
        category: "Bình thường",
      },
    });
  };

  const handleViewMeal = (mealId: string, mealName: string) => {
    router.push({
      pathname: "/meal/[id]",
      params: { id: mealId, name: mealName },
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.greeting}>Xin chào, An! 👋</Text>
        <Text style={styles.subtitle}>Hôm nay bạn thế nào?</Text>

        {/* Card BMI */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💪 Chỉ số BMI</Text>
          <Text style={styles.bmiValue}>{bmiData.value}</Text>
          <Text style={[styles.bmiCategory, { color: bmiData.color }]}>
            🟢 {bmiData.category}
          </Text>
          <Pressable style={styles.linkButton} onPress={handleViewBMI}>
            <Text style={styles.linkButtonText}>Xem chi tiết →</Text>
          </Pressable>
        </View>

        {/* Card Hoạt động */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏃 Hoạt động hôm nay</Text>
          <View style={styles.activityRow}>
            <View style={styles.activityItem}>
              <Text style={styles.activityValue}>8,245</Text>
              <Text style={styles.activityLabel}>🚶 Bước đi</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityValue}>1,850</Text>
              <Text style={styles.activityLabel}>🔥 Calories</Text>
            </View>
          </View>
        </View>

        {/* Gợi ý thực đơn */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🍽️ Gợi ý thực đơn hôm nay</Text>

          <Pressable
            style={styles.mealSuggestion}
            onPress={() => handleViewMeal("1", "Phở bò")}
          >
            <Text style={styles.mealName}>Phở bò</Text>
            <Text style={styles.mealCal}>450 kcal →</Text>
          </Pressable>

          <Pressable
            style={styles.mealSuggestion}
            onPress={() => handleViewMeal("2", "Salad rau")}
          >
            <Text style={styles.mealName}>Salad rau</Text>
            <Text style={styles.mealCal}>180 kcal →</Text>
          </Pressable>

          <Pressable
            style={[styles.linkButton, { marginTop: 12 }]}
            onPress={() => router.push("/(tabs)/meals")}
          >
            <Text style={styles.linkButtonText}>Xem toàn bộ menu →</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingTop: 20,
  },
  greeting: { fontSize: 26, fontWeight: "bold", color: "#1a1a2e" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4, marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 12,
  },
  bmiValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1a1a2e",
    textAlign: "center",
  },
  bmiCategory: { fontSize: 16, textAlign: "center", marginTop: 4 },
  linkButton: {
    backgroundColor: "#eef2ff",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 16,
    alignItems: "center",
  },
  linkButtonText: { color: "#4f46e5", fontWeight: "600" },
  activityRow: { flexDirection: "row", justifyContent: "space-around" },
  activityItem: { alignItems: "center" },
  activityValue: { fontSize: 24, fontWeight: "bold", color: "#1a1a2e" },
  activityLabel: { fontSize: 13, color: "#666", marginTop: 4 },
  mealSuggestion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  mealName: { fontSize: 15, color: "#374151" },
  mealCal: { fontSize: 13, color: "#9ca3af" },
});
