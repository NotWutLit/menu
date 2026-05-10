import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function BMIResultScreen() {
  const { bmi, height, weight, category } = useLocalSearchParams<{
    bmi: string;
    height: string;
    weight: string;
    category: string;
  }>();

  const bmiNum = parseFloat(bmi ?? "0");

  const getBMIColor = () => {
    if (bmiNum < 18.5) return "#3b82f6";
    if (bmiNum < 25) return "#22c55e";
    if (bmiNum < 30) return "#f59e0b";
    return "#ef4444";
  };

  const bmiScale = [
    { range: "< 18.5", label: "Thiếu cân", isActive: bmiNum < 18.5 },
    { range: "18.5 – 24.9", label: "Bình thường", isActive: bmiNum >= 18.5 && bmiNum < 25 },
    { range: "25 – 29.9", label: "Thừa cân", isActive: bmiNum >= 25 && bmiNum < 30 },
    { range: "≥ 30", label: "Béo phì", isActive: bmiNum >= 30 },
  ];

  const getAdvice = () => {
    if (bmiNum < 18.5) return "Bạn đang thiếu cân. Hãy bổ sung dinh dưỡng và tham khảo ý kiến bác sĩ.";
    if (bmiNum < 25) return "Bạn đang có chỉ số BMI khỏe mạnh. Hãy duy trì chế độ ăn cân bằng và tập thể dục đều đặn.";
    if (bmiNum < 30) return "Bạn đang thừa cân. Hãy tăng cường vận động và điều chỉnh chế độ ăn uống.";
    return "Bạn đang béo phì. Hãy tham khảo bác sĩ để có kế hoạch giảm cân phù hợp.";
  };

  return (
    <ScrollView style={styles.container}>
      {/* BMI Circle */}
      <View style={styles.bmiSection}>
        <View style={[styles.bmiCircle, { borderColor: getBMIColor() }]}>
          <Text style={[styles.bmiNumber, { color: getBMIColor() }]}>{bmi}</Text>
        </View>
        <Text style={[styles.categoryText, { color: getBMIColor() }]}>{category}</Text>
      </View>

      {/* Thông tin đo */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Chiều cao:</Text>
          <Text style={styles.infoValue}>{height} cm</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Cân nặng:</Text>
          <Text style={styles.infoValue}>{weight} kg</Text>
        </View>
        <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.infoLabel}>Ngày đo:</Text>
          <Text style={styles.infoValue}>17/04/2026</Text>
        </View>
      </View>

      {/* Thang đo BMI */}
      <View style={styles.scaleCard}>
        <Text style={styles.sectionTitle}>📊 Thang đo BMI</Text>
        {bmiScale.map((item) => (
          <View
            key={item.range}
            style={[styles.scaleRow, item.isActive && styles.scaleRowActive]}
          >
            <Text style={styles.scaleRange}>{item.range}</Text>
            <Text style={styles.scaleLabel}>{item.label}</Text>
            {item.isActive && <Text style={styles.scaleArrow}>←</Text>}
          </View>
        ))}
      </View>

      {/* Lời khuyên */}
      <View style={styles.adviceCard}>
        <Text style={styles.sectionTitle}>💡 Lời khuyên</Text>
        <Text style={styles.adviceText}>{getAdvice()}</Text>
      </View>

      {/* Nút quay lại */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Quay lại trang chủ</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  bmiSection: { alignItems: "center", marginVertical: 24 },
  bmiCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  bmiNumber: { fontSize: 42, fontWeight: "bold" },
  categoryText: { fontSize: 20, fontWeight: "bold", marginTop: 12 },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  infoLabel: { fontSize: 15, color: "#666" },
  infoValue: { fontSize: 15, fontWeight: "bold", color: "#1a1a2e" },
  scaleCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#1a1a2e", marginBottom: 12 },
  scaleRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  scaleRowActive: { backgroundColor: "#eef2ff" },
  scaleRange: { width: 100, fontSize: 14, color: "#374151" },
  scaleLabel: { flex: 1, fontSize: 14, color: "#374151" },
  scaleArrow: { fontSize: 14, color: "#4f46e5", fontWeight: "bold" },
  adviceCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  adviceText: { fontSize: 14, color: "#374151", lineHeight: 22 },
  backButton: {
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 40,
  },
  backButtonText: { color: "#374151", fontSize: 16, fontWeight: "600" },
});
