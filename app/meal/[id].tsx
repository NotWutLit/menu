import { MEALS_DATA } from "@/constants/meal_detail";
import { useLocalSearchParams } from "expo-router";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MealDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const meal = MEALS_DATA[id] ?? MEALS_DATA["1"];

  const handleAddToMenu = () => {
    Alert.alert("Thành công", `Đã thêm "${meal.name}" vào thực đơn!`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Ảnh món ăn */}
      <Image source={{ uri: meal.image }} style={styles.mealImage} />

      {/* Tên và đánh giá */}
      <View style={styles.headerSection}>
        <Text style={styles.mealName}>{meal.name}</Text>
        <Text style={styles.mealMeta}>
          ⭐ {meal.rating} • 🕐 {meal.time}
        </Text>
      </View>

      {/* Chỉ số dinh dưỡng — 3 cột */}
      <View style={styles.nutritionRow}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{meal.calories}</Text>
          <Text style={styles.nutritionLabel}>kcal</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{meal.protein}g</Text>
          <Text style={styles.nutritionLabel}>Protein</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{meal.fat}g</Text>
          <Text style={styles.nutritionLabel}>Fat</Text>
        </View>
      </View>

      {/* Mô tả */}
      <View style={styles.descriptionCard}>
        <Text style={styles.sectionTitle}>📝 Mô tả</Text>
        <Text style={styles.description}>{meal.description}</Text>
      </View>

      {/* Nguyên liệu */}
      <View style={styles.ingredientsCard}>
        <Text style={styles.sectionTitle}>🥗 Nguyên liệu</Text>
        {meal.ingredients.map((item) => (
          <View key={item.name} style={styles.ingredientRow}>
            <Text style={styles.ingredientName}>• {item.name}</Text>
            <Text style={styles.ingredientAmount}>{item.amount}</Text>
          </View>
        ))}
      </View>

      {/* Nút thêm */}
      <Pressable style={styles.addButton} onPress={handleAddToMenu}>
        <Text style={styles.addButtonText}>+ Thêm vào thực đơn</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  mealImage: { width: "100%", height: 220 },
  headerSection: { padding: 20 },
  mealName: { fontSize: 24, fontWeight: "bold", color: "#1a1a2e" },
  mealMeta: { fontSize: 14, color: "#9ca3af", marginTop: 6 },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  nutritionItem: { alignItems: "center" },
  nutritionValue: { fontSize: 20, fontWeight: "bold", color: "#4f46e5" },
  nutritionLabel: { fontSize: 12, color: "#9ca3af", marginTop: 4 },
  descriptionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  description: { fontSize: 14, color: "#666", lineHeight: 22 },
  ingredientsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 12,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  ingredientName: { fontSize: 14, color: "#374151" },
  ingredientAmount: { fontSize: 14, color: "#9ca3af" },
  addButton: {
    backgroundColor: "#4f46e5",
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
