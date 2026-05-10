import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const MAP_RESULT_BMI: {
  [key: string]: {
    text: string;
    advice: string;
    color: string;
  };
} = {
  under: {
    text: "Thiếu cân",
    advice: "Bạn cần bổ sung thêm dinh dưỡng. Hãy tham khảo ý kiến bác sĩ.",
    color: "#3b82f6",
  },
  normal: {
    text: "Bình thường",
    advice: "Bạn có chỉ số BMI khỏe mạnh! Hãy duy trì lối sống hiện tại.",
    color: "#22c55e",
  },
  over: {
    text: "Thừa cân",
    advice: "Hãy tăng cường vận động và điều chỉnh chế độ ăn uống.",
    color: "#f59e0b",
  },
  obese: {
    text: "Béo phì",
    advice:
      "Bạn nên tham khảo ý kiến bác sĩ để có kế hoạch giảm cân phù hợp và an toàn.",
    color: "#ef4444",
  },
};

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{
    bmi: string;
    text: string;
    advice: string;
    color: string;
  } | null>(null);

  const calculateBMI = () => {
    const h = Number(height) / 100;
    const w = Number(weight);
    // falsy: 0, null, undefined, "", []
    if (!h || !w || h <= 0 || w <= 0) {
      Alert.alert("Lỗi", "Vui lòng nhập thông tin hợp lệ");
    }
    // < 18.5	Thiếu cân	🔵 #3b82f6
    // 18.5 – 24.9	Bình thường	🟢 #22c55e
    // 25 – 29.9	Thừa cân	🟠 #f59e0b
    // ≥ 30	Béo phì	🔴 #ef4444
    const bmi: number = w / h ** 2;
    let type = "under";
    if (bmi >= 30) {
      type = "obese";
    } else if (bmi >= 25) {
      type = "over";
    } else if (bmi >= 18.5) {
      type = "normal";
    }
    setResult({
      bmi: bmi.toFixed(1),
      text: MAP_RESULT_BMI[type].text,
      advice: MAP_RESULT_BMI[type].advice,
      color: MAP_RESULT_BMI[type].color,
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>💪 BMI Calculator</Text>
        <Text style={styles.subtitle}>Kiểm tra sức khỏe của bạn</Text>

        <View style={styles.form}>
          <Text style={styles.label}>📏 Chiều cao (cm)</Text>
          <TextInput
            value={height}
            onChangeText={(value) => setHeight(value)}
            style={styles.input}
            placeholder="VD: 170cm"
          />
          <Text style={styles.label}>⚖️ Cân nặng (kg)</Text>
          <TextInput
            value={weight}
            onChangeText={(value) => setWeight(value)}
            style={styles.input}
            placeholder="VD: 65kg"
          />
          <Pressable style={styles.button} onPress={calculateBMI}>
            <Text style={styles.buttonText}>🔍 TÍNH BMI</Text>
          </Pressable>
        </View>

        {result && (
          <View style={styles.resultCard}>
            <View style={[styles.bmiCircle, { borderColor: result.color }]}>
              <Text style={[styles.bmiNumber, { color: result.color }]}>
                {result.bmi}
              </Text>
            </View>
            <Text style={[styles.txtResult, { color: result.color }]}>
              {result.text}
            </Text>
            <Text style={styles.advice}>{result.advice}</Text>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BMICalculator;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#d6f9e1",
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a2e",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  form: {
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#6366f1",
    borderRadius: 10,
    padding: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
    alignItems: "center",
    gap: 8,
  },
  bmiCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  bmiNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: "green",
  },
  txtResult: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  advice: {
    fontSize: 14,
    color: "#374151",
    textAlign: "center",
    lineHeight: 20,
  },
});
