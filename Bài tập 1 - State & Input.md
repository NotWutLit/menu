# GIAI ĐOẠN A – BÀI TẬP THỰC HÀNH

## Chủ đề 1: 🎛️ State & Input

> **Mục tiêu:** Hiểu `useState` để quản lý dữ liệu thay đổi, dùng `TextInput` để nhận dữ liệu từ người dùng, dùng `Button`/`Pressable` để kích hoạt hành động — tất cả kết hợp trong app tính BMI hoàn chỉnh.

---

## Kiến thức cần nắm trước khi làm bài

### 1. useState — Bộ nhớ của Component

**Vấn đề:** Biến JavaScript thường **không làm giao diện cập nhật** khi thay đổi.

```jsx
// ❌ Giao diện KHÔNG cập nhật khi nhấn nút
let count = 0;

function Counter() {
  return (
    <View>
      <Text>{count}</Text>
      <Pressable
        onPress={() => {
          count += 1;
        }}
      >
        <Text>Tăng</Text>
      </Pressable>
    </View>
  );
}
```

**Giải pháp:** Dùng `useState` — React Native sẽ **tự động render lại** khi state thay đổi.

```jsx
import { useState } from "react";

// ✅ Giao diện CẬP NHẬT khi nhấn nút
function Counter() {
  const [count, setCount] = useState(0);
  //     ↑         ↑              ↑
  //  giá trị   hàm cập nhật   giá trị ban đầu

  return (
    <View>
      <Text>{count}</Text>
      <Pressable onPress={() => setCount(count + 1)}>
        <Text>Tăng</Text>
      </Pressable>
    </View>
  );
}
```

**Quy tắc ghi nhớ:**

| Khái niệm                | Giải thích                                        |
| ------------------------ | ------------------------------------------------- |
| `useState(initialValue)` | Tạo một ô nhớ với giá trị ban đầu                 |
| `[value, setValue]`      | Trả về [giá trị hiện tại, hàm để cập nhật]        |
| Khi gọi `setValue(...)`  | React Native render lại giao diện với giá trị mới |
| State là **riêng biệt**  | Mỗi component có state của riêng mình             |

---

### 2. TextInput — Ô nhập liệu

```jsx
import { TextInput, useState } from "react-native";

function MyInput() {
  const [text, setText] = useState("");

  return (
    <TextInput
      value={text} // Hiển thị giá trị hiện tại
      onChangeText={(newText) => setText(newText)} // Cập nhật khi gõ
      placeholder="Nhập tên..." // Gợi ý khi ô trống
      keyboardType="default" // Loại bàn phím
      style={{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
      }}
    />
  );
}
```

**Các `keyboardType` thường dùng:**

| keyboardType      | Dùng khi      | Ví dụ          |
| ----------------- | ------------- | -------------- |
| `"default"`       | Nhập chữ      | Tên, địa chỉ   |
| `"numeric"`       | Nhập số       | Tuổi, cân nặng |
| `"decimal-pad"`   | Số thập phân  | Chiều cao 1.75 |
| `"email-address"` | Email         | abc@gmail.com  |
| `"phone-pad"`     | Số điện thoại | 0901-234-567   |

---

### 3. Button / Pressable — Nút bấm

```jsx
// Cách 1: Button đơn giản (ít tùy chỉnh giao diện)
<Button title="Tính BMI" onPress={handleCalculate} />

// Cách 2: Pressable (tùy chỉnh hoàn toàn) — khuyến khích dùng
<Pressable style={styles.button} onPress={handleCalculate}>
  <Text style={styles.buttonText}>Tính BMI</Text>
</Pressable>
```

---

## 📐 BÀI TẬP CHÍNH: App Tính BMI (Body Mass Index)

### Mô tả ứng dụng

Xây dựng app tính **chỉ số BMI** (Body Mass Index) — công cụ đánh giá sức khỏe phổ biến.

**Công thức:**

```
BMI = Cân nặng (kg) / (Chiều cao (m))²
```

**Bảng phân loại BMI (WHO):**

| BMI         | Phân loại   | Màu sắc      |
| ----------- | ----------- | ------------ |
| < 18.5      | Thiếu cân   | 🔵 `#3b82f6` |
| 18.5 – 24.9 | Bình thường | 🟢 `#22c55e` |
| 25 – 29.9   | Thừa cân    | 🟠 `#f59e0b` |
| ≥ 30        | Béo phì     | 🔴 `#ef4444` |

---

### Giao diện mẫu — Trước khi tính

```
┌─────────────────────────────────┐
│         💪 BMI Calculator       │
│     Kiểm tra sức khỏe của bạn  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 📏 Chiều cao (cm)        │  │
│  │ ┌───────────────────────┐ │  │
│  │ │ 170                   │ │  │
│  │ └───────────────────────┘ │  │
│  │                           │  │
│  │ ⚖️ Cân nặng (kg)         │  │
│  │ ┌───────────────────────┐ │  │
│  │ │ 65                    │ │  │
│  │ └───────────────────────┘ │  │
│  │                           │  │
│  │ ┌───────────────────────┐ │  │
│  │ │     🔍 TÍNH BMI       │ │  │
│  │ └───────────────────────┘ │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

### Giao diện mẫu — Sau khi tính (Kết quả bình thường)

```
┌─────────────────────────────────┐
│         💪 BMI Calculator       │
│     Kiểm tra sức khỏe của bạn  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 📏 Chiều cao (cm)        │  │
│  │ ┌───────────────────────┐ │  │
│  │ │ 170                   │ │  │
│  │ └───────────────────────┘ │  │
│  │                           │  │
│  │ ⚖️ Cân nặng (kg)         │  │
│  │ ┌───────────────────────┐ │  │
│  │ │ 65                    │ │  │
│  │ └───────────────────────┘ │  │
│  │                           │  │
│  │ ┌───────────────────────┐ │  │
│  │ │     🔍 TÍNH BMI       │ │  │
│  │ └───────────────────────┘ │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │    ┌─────────────────┐    │  │
│  │    │                 │    │  │
│  │    │      22.5       │    │  │
│  │    │                 │    │  │
│  │    └─────────────────┘    │  │
│  │                           │  │
│  │   🟢 Bình thường          │  │
│  │                           │  │
│  │   Bạn có chỉ số BMI      │  │
│  │   khỏe mạnh! Hãy duy trì │  │
│  │   lối sống hiện tại.     │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │     🔄 Tính lại           │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

### Giao diện mẫu — Kết quả thiếu cân

```
┌───────────────────────────┐
│    ┌─────────────────┐    │
│    │      16.8       │    │
│    └─────────────────┘    │
│                           │
│   🔵 Thiếu cân           │
│                           │
│   Bạn cần bổ sung thêm   │
│   dinh dưỡng. Hãy tham   │
│   khảo ý kiến bác sĩ.    │
└───────────────────────────┘
```

### Giao diện mẫu — Kết quả thừa cân

```
┌───────────────────────────┐
│    ┌─────────────────┐    │
│    │      27.3       │    │
│    └─────────────────┘    │
│                           │
│   🟠 Thừa cân            │
│                           │
│   Hãy tăng cường vận     │
│   động và điều chỉnh     │
│   chế độ ăn uống.        │
└───────────────────────────┘
```

---

### Hướng dẫn từng bước

#### Bước 1 — Tạo file và import

Tạo file `app/bmi-calculator.tsx` (hoặc sửa trong `app/(tabs)/index.tsx`):

```jsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
```

#### Bước 2 — Khai báo State

Bạn cần lưu trữ 3 thông tin thay đổi:

```jsx
export default function BMICalculator() {
  const [height, setHeight] = useState(""); // Chiều cao (chuỗi vì TextInput trả về chuỗi)
  const [weight, setWeight] = useState(""); // Cân nặng
  const [result, setResult] = useState(null); // Kết quả BMI (null = chưa tính)

  // ... phần render sẽ viết ở bước sau
}
```

> **Tại sao `height` và `weight` là chuỗi `""`?**
> Vì `TextInput` luôn trả về **chuỗi** (string). Ta sẽ chuyển sang số khi tính toán.

#### Bước 3 — Viết hàm tính BMI

```jsx
const calculateBMI = () => {
  // Chuyển chuỗi → số
  const h = parseFloat(height) / 100; // cm → m
  const w = parseFloat(weight);

  // Kiểm tra dữ liệu hợp lệ
  if (!h || !w || h <= 0 || w <= 0) {
    Alert.alert("Lỗi", "Vui lòng nhập chiều cao và cân nặng hợp lệ!");
    return;
  }

  // Tính BMI
  const bmi = w / (h * h);

  // Phân loại
  let category = "";
  let color = "";
  let advice = "";

  if (bmi < 18.5) {
    category = "Thiếu cân";
    color = "#3b82f6";
    advice = "Bạn cần bổ sung thêm dinh dưỡng. Hãy tham khảo ý kiến bác sĩ.";
  } else if (bmi < 25) {
    category = "Bình thường";
    color = "#22c55e";
    advice = "Bạn có chỉ số BMI khỏe mạnh! Hãy duy trì lối sống hiện tại.";
  } else if (bmi < 30) {
    category = "Thừa cân";
    color = "#f59e0b";
    advice = "Hãy tăng cường vận động và điều chỉnh chế độ ăn uống.";
  } else {
    category = "Béo phì";
    color = "#ef4444";
    advice = "Hãy gặp bác sĩ để được tư vấn chế độ ăn và tập luyện phù hợp.";
  }

  // Lưu kết quả vào state
  setResult({ bmi: bmi.toFixed(1), category, color, advice });
};
```

**Kiến thức mới trong bước này:**

| Cú pháp                             | Ý nghĩa                                             |
| ----------------------------------- | --------------------------------------------------- |
| `parseFloat("170")`                 | Chuyển chuỗi `"170"` → số `170`                     |
| `bmi.toFixed(1)`                    | Làm tròn đến 1 chữ số thập phân: `22.49` → `"22.5"` |
| `setResult({ bmi, category, ... })` | Lưu **object** vào state                            |

#### Bước 4 — Viết hàm reset

```jsx
const resetCalculator = () => {
  setHeight("");
  setWeight("");
  setResult(null);
};
```

#### Bước 5 — Viết giao diện (return JSX)

```jsx
return (
  <ScrollView style={styles.container}>
    {/* Header */}
    <Text style={styles.title}>💪 BMI Calculator</Text>
    <Text style={styles.subtitle}>Kiểm tra sức khỏe của bạn</Text>

    {/* Form nhập liệu */}
    <View style={styles.inputCard}>
      <Text style={styles.label}>📏 Chiều cao (cm)</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        placeholder="VD: 170"
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>⚖️ Cân nặng (kg)</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        placeholder="VD: 65"
        keyboardType="decimal-pad"
      />

      <Pressable style={styles.calculateButton} onPress={calculateBMI}>
        <Text style={styles.calculateButtonText}>🔍 TÍNH BMI</Text>
      </Pressable>
    </View>

    {/* Kết quả — chỉ hiện khi đã tính */}
    {result && (
      <View style={styles.resultCard}>
        <View style={[styles.bmiCircle, { borderColor: result.color }]}>
          <Text style={[styles.bmiNumber, { color: result.color }]}>
            {result.bmi}
          </Text>
        </View>

        <Text style={[styles.category, { color: result.color }]}>
          {result.category}
        </Text>

        <Text style={styles.advice}>{result.advice}</Text>
      </View>
    )}

    {/* Nút Tính lại */}
    {result && (
      <Pressable style={styles.resetButton} onPress={resetCalculator}>
        <Text style={styles.resetButtonText}>🔄 Tính lại</Text>
      </Pressable>
    )}
  </ScrollView>
);
```

**Kiến thức mới trong bước này:**

| Cú pháp                                                     | Ý nghĩa                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------- |
| `onChangeText={setHeight}`                                  | Viết tắt của `onChangeText={(text) => setHeight(text)}` |
| `{result && (...)}`                                         | Chỉ hiện giao diện khi `result` không phải `null`       |
| `style={[styles.bmiCircle, { borderColor: result.color }]}` | Kết hợp style cố định + style động                      |

#### Bước 6 — Viết StyleSheet

```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4",
    padding: 20,
    paddingTop: 60,
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
    marginTop: 4,
    marginBottom: 24,
  },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  calculateButton: {
    backgroundColor: "#6366f1",
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 20,
    alignItems: "center",
  },
  calculateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  bmiCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  bmiNumber: {
    fontSize: 36,
    fontWeight: "bold",
  },
  category: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  advice: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  resetButton: {
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 16,
    marginBottom: 40,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },
});
```

---

### Code hoàn chỉnh — App BMI Calculator

```jsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      Alert.alert("Lỗi", "Vui lòng nhập chiều cao và cân nặng hợp lệ!");
      return;
    }

    const bmi = w / (h * h);
    let category, color, advice;

    if (bmi < 18.5) {
      category = "Thiếu cân";
      color = "#3b82f6";
      advice = "Bạn cần bổ sung thêm dinh dưỡng. Hãy tham khảo ý kiến bác sĩ.";
    } else if (bmi < 25) {
      category = "Bình thường";
      color = "#22c55e";
      advice = "Bạn có chỉ số BMI khỏe mạnh! Hãy duy trì lối sống hiện tại.";
    } else if (bmi < 30) {
      category = "Thừa cân";
      color = "#f59e0b";
      advice = "Hãy tăng cường vận động và điều chỉnh chế độ ăn uống.";
    } else {
      category = "Béo phì";
      color = "#ef4444";
      advice = "Hãy gặp bác sĩ để được tư vấn chế độ ăn và tập luyện phù hợp.";
    }

    setResult({ bmi: bmi.toFixed(1), category, color, advice });
  };

  const resetCalculator = () => {
    setHeight("");
    setWeight("");
    setResult(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💪 BMI Calculator</Text>
      <Text style={styles.subtitle}>Kiểm tra sức khỏe của bạn</Text>

      <View style={styles.inputCard}>
        <Text style={styles.label}>📏 Chiều cao (cm)</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          placeholder="VD: 170"
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>⚖️ Cân nặng (kg)</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="VD: 65"
          keyboardType="decimal-pad"
        />

        <Pressable style={styles.calculateButton} onPress={calculateBMI}>
          <Text style={styles.calculateButtonText}>🔍 TÍNH BMI</Text>
        </Pressable>
      </View>

      {result && (
        <View style={styles.resultCard}>
          <View style={[styles.bmiCircle, { borderColor: result.color }]}>
            <Text style={[styles.bmiNumber, { color: result.color }]}>
              {result.bmi}
            </Text>
          </View>
          <Text style={[styles.category, { color: result.color }]}>
            {result.category}
          </Text>
          <Text style={styles.advice}>{result.advice}</Text>
        </View>
      )}

      {result && (
        <Pressable style={styles.resetButton} onPress={resetCalculator}>
          <Text style={styles.resetButtonText}>🔄 Tính lại</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4",
    padding: 20,
    paddingTop: 60,
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
    marginTop: 4,
    marginBottom: 24,
  },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  calculateButton: {
    backgroundColor: "#6366f1",
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 20,
    alignItems: "center",
  },
  calculateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  bmiCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  bmiNumber: {
    fontSize: 36,
    fontWeight: "bold",
  },
  category: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  advice: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  resetButton: {
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 16,
    marginBottom: 40,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },
});
```

---

## Bài tập thực hành bổ sung

### Bài 1 — Bộ đếm nâng cao (Counter Pro)

Tạo app đếm số với các tính năng:

```
┌─────────────────────────────────┐
│        🔢 Counter Pro           │
│                                 │
│        ┌─────────────┐          │
│        │             │          │
│        │     15      │          │
│        │             │          │
│        └─────────────┘          │
│                                 │
│   ┌────┐  ┌────┐  ┌────┐       │
│   │ -5 │  │ -1 │  │ +1 │       │
│   └────┘  └────┘  └────┘       │
│                                 │
│   ┌────┐  ┌────┐  ┌────┐       │
│   │ +5 │  │+10 │  │ 🔄 │       │
│   └────┘  └────┘  └────┘       │
│                                 │
│   Số lần bấm: 12               │
│   Giá trị lớn nhất: 25         │
│   Giá trị nhỏ nhất: -3         │
│                                 │
└─────────────────────────────────┘
```

**Yêu cầu:**

1. State cần: `count`, `pressCount` (đếm số lần bấm), `maxValue`, `minValue`.
2. Có 6 nút: -5, -1, +1, +5, +10, Reset.
3. Hiển thị thống kê: số lần bấm, giá trị lớn/nhỏ nhất.
4. Khi `count` > 0 → số màu xanh. `count` < 0 → số màu đỏ. `count` === 0 → màu xám.
5. Nút Reset đưa tất cả về 0.

**Gợi ý:**

```jsx
const [count, setCount] = useState(0);
const [pressCount, setPressCount] = useState(0);
const [maxValue, setMaxValue] = useState(0);
const [minValue, setMinValue] = useState(0);

const handleChange = (amount) => {
  const newCount = count + amount;
  setCount(newCount);
  setPressCount(pressCount + 1);
  if (newCount > maxValue) setMaxValue(newCount);
  if (newCount < minValue) setMinValue(newCount);
};
```

---

### Bài 2 — Chuyển đổi nhiệt độ

Tạo app chuyển đổi giữa °C và °F:

```
┌─────────────────────────────────┐
│     🌡️ Chuyển đổi nhiệt độ      │
│                                 │
│  Nhập nhiệt độ:                 │
│  ┌───────────────────────────┐  │
│  │ 37.5                      │  │
│  └───────────────────────────┘  │
│                                 │
│  Đơn vị:                        │
│  ┌──────────┐  ┌──────────┐     │
│  │ °C → °F  │  │ °F → °C  │     │
│  │ (active) │  │          │     │
│  └──────────┘  └──────────┘     │
│                                 │
│  ┌───────────────────────────┐  │
│  │      🔄 CHUYỂN ĐỔI        │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │   37.5 °C = 99.5 °F       │  │
│  │                           │  │
│  │   🌤️ Nhiệt độ bình        │  │
│  │      thường cơ thể        │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

**Yêu cầu:**

1. Nhập nhiệt độ bằng `TextInput` (keyboardType: `decimal-pad`).
2. Chọn chiều chuyển đổi: °C→°F hoặc °F→°C (dùng 2 `Pressable` để toggle).
3. Công thức: `°F = °C × 9/5 + 32` | `°C = (°F - 32) × 5/9`
4. Phân loại nhiệt độ (sau khi chuyển sang °C):
   - < 0°C: ❄️ Rất lạnh (xanh dương)
   - 0–15°C: 🌨️ Lạnh (xanh nhạt)
   - 15–30°C: 🌤️ Mát mẻ (xanh lá)
   - 30–40°C: ☀️ Nóng (cam)
   - > 40°C: 🔥 Rất nóng (đỏ)

**Gợi ý state:**

```jsx
const [temperature, setTemperature] = useState("");
const [isCelsius, setIsCelsius] = useState(true); // true = C→F, false = F→C
const [result, setResult] = useState(null);
```

---

### Bài 3 — Form đăng ký tài khoản (Nâng cao)

Tạo form đăng ký với validation:

```
┌─────────────────────────────────┐
│      📝 Tạo tài khoản           │
│                                 │
│  Họ tên *                        │
│  ┌───────────────────────────┐  │
│  │ Nguyễn Văn An             │  │
│  └───────────────────────────┘  │
│                                 │
│  Email *                         │
│  ┌───────────────────────────┐  │
│  │ an@gmail.com              │  │
│  └───────────────────────────┘  │
│                                 │
│  Số điện thoại *                 │
│  ┌───────────────────────────┐  │
│  │ 0901234567                │  │
│  └───────────────────────────┘  │
│                                 │
│  Tuổi                            │
│  ┌───────────────────────────┐  │
│  │ 22                        │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │      ✅ ĐĂNG KÝ          │  │
│  └───────────────────────────┘  │
│                                 │
│  ❌ Email không hợp lệ          │
│                                 │
└─────────────────────────────────┘
```

**Yêu cầu:**

1. 4 ô input: Họ tên, Email, Số điện thoại, Tuổi.
2. Validate khi nhấn "Đăng ký":
   - Họ tên: không được trống, ít nhất 2 ký tự.
   - Email: phải chứa `@` và `.`.
   - Số điện thoại: phải bắt đầu bằng `0`, đủ 10 số.
   - Tuổi: phải từ 16 đến 100.
3. Nếu có lỗi → hiện dòng lỗi **màu đỏ** bên dưới ô tương ứng.
4. Nếu tất cả hợp lệ → hiện Alert "Đăng ký thành công!" và reset form.

**Gợi ý state:**

```jsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [age, setAge] = useState("");
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  if (name.trim().length < 2) newErrors.name = "Họ tên phải có ít nhất 2 ký tự";
  if (!email.includes("@") || !email.includes("."))
    newErrors.email = "Email không hợp lệ";
  if (!phone.startsWith("0") || phone.length !== 10)
    newErrors.phone = "SĐT phải bắt đầu bằng 0 và đủ 10 số";
  const ageNum = parseInt(age);
  if (!ageNum || ageNum < 16 || ageNum > 100)
    newErrors.age = "Tuổi phải từ 16 đến 100";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

---

## Ôn tập — Kiểm tra kiến thức

1. `useState` khác biến thường ở điểm nào? Tại sao cần `useState`?
2. `TextInput` trả về kiểu dữ liệu gì? Cách chuyển sang số?
3. Viết code: Tạo ô input nhập tên, khi nhấn nút → Alert hiển thị "Xin chào, {tên}!".
4. Giải thích `{result && (...)}` — khi nào phần bên trong sẽ hiển thị?
5. Tại sao dùng `style={[styles.base, { color: dynamicColor }]}` thay vì chỉ inline style?

---

## Xem trước chủ đề tiếp theo

Chủ đề tiếp theo sẽ học về **Giao diện & Flexbox** — cách bố trí layout chuyên nghiệp:

- `View` là container vạn năng.
- `Flexbox` — hệ thống layout mạnh mẽ của React Native.
- Xây dựng trang hồ sơ sức khỏe với layout phức tạp.
