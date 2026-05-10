# GIAI ĐOẠN A – BÀI TẬP THỰC HÀNH
## Chủ đề 3: 🧭 Điều hướng — Navigation & Luồng màn hình

> **Mục tiêu:** Hiểu hệ thống điều hướng trong React Native, cách tạo luồng chuyển giữa các màn hình, truyền dữ liệu qua lại — xây dựng app sức khỏe có nhiều trang hoàn chỉnh.

---

## Kiến thức cần nắm trước khi làm bài

### 1. Tại sao cần Navigation?

App di động không phải là **một trang duy nhất**. Nó gồm **nhiều màn hình**:

```
App Sức khỏe
├── 🏠 Trang chủ        ← Xem tổng quan sức khỏe
├── 📊 Chi tiết BMI     ← Xem kết quả BMI chi tiết
├── 🍽️ Thực đơn         ← Danh sách thực đơn
├── 📝 Chi tiết món     ← Xem chi tiết 1 món ăn
└── 👤 Hồ sơ            ← Thông tin cá nhân
```

**Vấn đề:** Làm sao để **chuyển** từ Trang chủ → Chi tiết BMI → quay lại?

**Giải pháp:** Sử dụng hệ thống **Navigation** (điều hướng).

---

### 2. Expo Router — Hệ thống điều hướng dựa trên file

Expo Router sử dụng **cấu trúc file** để tự động tạo routes (đường dẫn):

```
app/
├── _layout.tsx           ← Layout gốc (cấu hình navigation)
├── index.tsx             ← Trang chủ (route: /)
├── bmi.tsx               ← Trang BMI (route: /bmi)
├── profile.tsx           ← Trang hồ sơ (route: /profile)
├── meal/
│   ├── _layout.tsx       ← Layout cho nhóm meal
│   ├── index.tsx         ← Danh sách thực đơn (route: /meal)
│   └── [id].tsx          ← Chi tiết 1 món (route: /meal/1, /meal/2...)
└── (tabs)/
    ├── _layout.tsx       ← Cấu hình Tab Navigation
    ├── index.tsx          ← Tab Home
    ├── meals.tsx          ← Tab Thực đơn
    └── profile.tsx        ← Tab Hồ sơ
```

**Quy tắc đặt tên file → route:**

| File | Route | Ý nghĩa |
|---|---|---|
| `app/index.tsx` | `/` | Trang chủ (mặc định) |
| `app/bmi.tsx` | `/bmi` | Trang tính BMI |
| `app/meal/index.tsx` | `/meal` | Danh sách thực đơn |
| `app/meal/[id].tsx` | `/meal/1`, `/meal/abc` | Trang chi tiết (dynamic route) |
| `app/(tabs)/_layout.tsx` | — | Cấu hình tab navigation |

---

### 3. Hai loại Navigation cơ bản

#### 3.1 Stack Navigation — Xếp chồng màn hình

Giống như **chồng bài tập**: đặt lên trên, bỏ từ trên xuống.

```
Nhấn "Xem chi tiết"              Nhấn nút "Back"
┌───────────┐                     ┌───────────┐
│           │                     │           │
│ Chi tiết  │ ← Màn hình mới     │ Trang chủ │ ← Quay lại
│           │    đặt lên trên     │           │
├───────────┤                     └───────────┘
│ Trang chủ │ ← Vẫn ở dưới
└───────────┘
```

**Khi nào dùng:** Khi muốn đi sâu vào chi tiết và quay lại (Danh sách → Chi tiết → Quay lại).

#### 3.2 Tab Navigation — Thanh điều hướng dưới cùng

```
┌───────────────────────────┐
│                           │
│       NỘI DUNG            │
│       TRANG HIỆN TẠI      │
│                           │
│                           │
├───────────────────────────┤
│  🏠      🍽️      👤      │  ← Tab Bar (luôn hiển thị)
│  Home   Meals   Profile   │
└───────────────────────────┘
```

**Khi nào dùng:** Khi có 2-5 phần chính mà user cần truy cập nhanh.

---

### 4. Cách điều hướng (chuyển màn hình)

#### 4.1 Dùng `<Link>` (đơn giản)

```jsx
import { Link } from "expo-router";

<Link href="/bmi">
  <Text>Đi đến trang BMI</Text>
</Link>

// Với dynamic route
<Link href="/meal/3">
  <Text>Xem món ăn #3</Text>
</Link>
```

#### 4.2 Dùng `router` (linh hoạt hơn)

```jsx
import { router } from "expo-router";

// Chuyển trang
router.push("/bmi");

// Chuyển trang với params
router.push({ pathname: "/meal/[id]", params: { id: "3", name: "Phở bò" } });

// Quay lại trang trước
router.back();

// Thay thế trang hiện tại (không thể back)
router.replace("/home");
```

#### 4.3 So sánh `push`, `replace`, `back`

| Phương thức | Ý nghĩa | Có thể back? |
|---|---|---|
| `router.push("/bmi")` | Thêm trang mới lên stack | ✅ Có |
| `router.replace("/home")` | Thay thế trang hiện tại | ❌ Không |
| `router.back()` | Quay lại trang trước | — |

---

### 5. Truyền và nhận dữ liệu giữa màn hình

#### 5.1 Truyền dữ liệu (Màn hình A → Màn hình B)

```jsx
// Từ Trang chủ → Chi tiết món ăn
router.push({
  pathname: "/meal/[id]",
  params: {
    id: "3",
    name: "Phở bò",
    calories: "450",
  },
});
```

#### 5.2 Nhận dữ liệu (Màn hình B)

```jsx
import { useLocalSearchParams } from "expo-router";

export default function MealDetail() {
  const { id, name, calories } = useLocalSearchParams();

  return (
    <View>
      <Text>Món ăn #{id}</Text>
      <Text>Tên: {name}</Text>
      <Text>Calories: {calories}</Text>
    </View>
  );
}
```

**Lưu ý quan trọng:**

| Quy tắc | Giải thích |
|---|---|
| Params luôn là **string** | Truyền `calories: "450"` → nhận được chuỗi `"450"` |
| Cần chuyển kiểu nếu cần số | `const cal = parseInt(calories)` |
| File `[id].tsx` → param `id` | Tên file = tên param |

---

## 📐 BÀI TẬP CHÍNH: App Sức khỏe Đa màn hình

### Mô tả ứng dụng

Xây dựng app sức khỏe với **4 màn hình** kết nối:

```
Luồng chuyển màn hình:

                    ┌──────────────┐
              ┌────→│ 📊 BMI       │
              │     │ (Chi tiết)   │
              │     └──────────────┘
              │
┌─────────┐   │     ┌──────────────┐      ┌──────────────┐
│ 🏠 Home │───┤────→│ 🍽️ Thực đơn  │─────→│ 📝 Chi tiết  │
│         │   │     │ (Danh sách)  │      │ (1 món ăn)   │
└─────────┘   │     └──────────────┘      └──────────────┘
              │
              │     ┌──────────────┐
              └────→│ 👤 Hồ sơ     │
                    │ (Profile)    │
                    └──────────────┘
```

---

### Cấu trúc thư mục

```
app/
├── _layout.tsx                ← Stack Navigator gốc
├── (tabs)/
│   ├── _layout.tsx            ← Tab Navigator (3 tabs)
│   ├── index.tsx              ← Tab 1: Trang chủ
│   ├── meals.tsx              ← Tab 2: Danh sách thực đơn
│   └── profile.tsx            ← Tab 3: Hồ sơ
├── bmi-result.tsx             ← Trang chi tiết BMI (push từ Home)
└── meal/
    └── [id].tsx               ← Trang chi tiết món ăn (push từ meals)
```

---

### Giao diện mẫu — Trang chủ (Tab Home)

```
┌─────────────────────────────────────┐
│                                     │
│  Xin chào, An! 👋                   │
│  Hôm nay bạn thế nào?              │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 💪 Chỉ số BMI               │    │
│  │                             │    │
│  │ BMI hiện tại: 22.5          │    │
│  │ 🟢 Bình thường              │    │
│  │                             │    │
│  │ ┌─────────────────────┐     │    │
│  │ │   Xem chi tiết →    │     │    │ ← Nhấn → push /bmi-result
│  │ └─────────────────────┘     │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🏃 Hoạt động hôm nay       │    │
│  │                             │    │
│  │  🚶 8,245    🔥 1,850      │    │
│  │  Bước đi     Calories       │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🍽️ Gợi ý thực đơn hôm nay  │    │
│  │                             │    │
│  │ Phở bò - 450 kcal          │    │ ← Nhấn → push /meal/1
│  │ Salad rau - 180 kcal       │    │ ← Nhấn → push /meal/2
│  │                             │    │
│  │ ┌─────────────────────┐     │    │
│  │ │  Xem toàn bộ menu → │     │    │ ← Nhấn → chuyển Tab meals
│  │ └─────────────────────┘     │    │
│  └─────────────────────────────┘    │
│                                     │
├─────────────────────────────────────┤
│  🏠 Home    🍽️ Meals    👤 Profile  │ ← Tab Bar
└─────────────────────────────────────┘
```

### Giao diện mẫu — Trang chi tiết BMI (push từ Home)

```
┌─────────────────────────────────────┐
│  ← Quay lại      Chi tiết BMI      │ ← Header với nút Back
├─────────────────────────────────────┤
│                                     │
│          ┌─────────────┐            │
│          │             │            │
│          │    22.5     │            │
│          │             │            │
│          └─────────────┘            │
│         🟢 Bình thường              │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Chiều cao:  170 cm          │    │
│  │ Cân nặng:   65 kg           │    │
│  │ Ngày đo:    08/04/2024      │    │
│  └─────────────────────────────┘    │
│                                     │
│  📊 Thang đo BMI                    │
│  ┌─────────────────────────────┐    │
│  │ ● < 18.5    Thiếu cân      │    │
│  │ ● 18.5-24.9 Bình thường ← │    │
│  │ ● 25-29.9   Thừa cân       │    │
│  │ ● ≥ 30      Béo phì        │    │
│  └─────────────────────────────┘    │
│                                     │
│  💡 Lời khuyên                      │
│  ┌─────────────────────────────┐    │
│  │ Bạn đang có chỉ số BMI     │    │
│  │ khỏe mạnh. Hãy duy trì     │    │
│  │ chế độ ăn cân bằng và      │    │
│  │ tập thể dục đều đặn.       │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │     🔄 Tính lại BMI        │    │ ← push /bmi-calculator
│  └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

### Giao diện mẫu — Trang chi tiết Món ăn (dynamic route)

```
┌─────────────────────────────────────┐
│  ← Quay lại      Chi tiết món ăn   │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │         🖼️ Ảnh món ăn       │    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  Phở bò tái chín                    │
│  ⭐ 4.8  •  🕐 30 phút             │
│                                     │
│  ┌──────────┐┌──────────┐┌────────┐ │
│  │ 450 kcal ││ 25g      ││ 15g    │ │
│  │ Calories ││ Protein  ││ Fat    │ │
│  └──────────┘└──────────┘└────────┘ │
│                                     │
│  📝 Mô tả                           │
│  ┌─────────────────────────────┐    │
│  │ Phở bò Hà Nội truyền thống │    │
│  │ với nước dùng đậm đà, thịt │    │
│  │ bò tái chín thơm ngon.     │    │
│  └─────────────────────────────┘    │
│                                     │
│  🥗 Nguyên liệu                     │
│  ┌─────────────────────────────┐    │
│  │ • Bánh phở       200g      │    │
│  │ • Thịt bò        150g      │    │
│  │ • Hành, ngò      50g       │    │
│  │ • Nước dùng      500ml     │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │   ➕ Thêm vào thực đơn     │    │
│  └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

---

### Hướng dẫn từng bước

#### Bước 1 — Cài đặt (nếu tạo project mới)

Expo Router được cài sẵn khi dùng `npx create-expo-app@latest`. Nếu cần cài thêm:

```bash
npx expo install expo-router expo-linking expo-constants
```

#### Bước 2 — Cấu hình Layout gốc (`app/_layout.tsx`)

```jsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Tabs group — không hiện header vì tabs tự có */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Màn hình BMI chi tiết */}
      <Stack.Screen
        name="bmi-result"
        options={{
          title: "Chi tiết BMI",
          headerStyle: { backgroundColor: "#4f46e5" },
          headerTintColor: "#fff",
        }}
      />

      {/* Màn hình chi tiết món ăn */}
      <Stack.Screen
        name="meal/[id]"
        options={{
          title: "Chi tiết món ăn",
          headerStyle: { backgroundColor: "#4f46e5" },
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}
```

**Giải thích:**

| Thuộc tính | Ý nghĩa |
|---|---|
| `<Stack>` | Tạo Stack Navigator — các màn hình xếp chồng |
| `<Stack.Screen name="(tabs)">` | Khai báo nhóm Tabs |
| `headerShown: false` | Ẩn header mặc định |
| `headerStyle` | Tùy chỉnh giao diện header |
| `headerTintColor` | Màu chữ và nút back trên header |

#### Bước 3 — Cấu hình Tab Navigation (`app/(tabs)/_layout.tsx`)

```jsx
import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4f46e5",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: "#4f46e5",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: "Thực đơn",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🍽️</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Hồ sơ",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}
```

**Giải thích cấu trúc Tabs:**

```
<Tabs>                           ← Container cho tất cả tabs
  screenOptions={{...}}          ← Style chung cho mọi tab
  <Tabs.Screen name="index">    ← Tab 1: khớp với file index.tsx
  <Tabs.Screen name="meals">    ← Tab 2: khớp với file meals.tsx
  <Tabs.Screen name="profile">  ← Tab 3: khớp với file profile.tsx
</Tabs>
```

#### Bước 4 — Trang chủ với nút chuyển trang (`app/(tabs)/index.tsx`)

```jsx
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
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

  const handleViewMeal = (mealId, mealName) => {
    router.push({
      pathname: "/meal/[id]",
      params: { id: mealId, name: mealName },
    });
  };

  return (
    <ScrollView style={styles.container}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20, paddingTop: 20 },
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
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#1a1a2e", marginBottom: 12 },
  bmiValue: { fontSize: 36, fontWeight: "bold", color: "#1a1a2e", textAlign: "center" },
  bmiCategory: { fontSize: 16, textAlign: "center", marginTop: 4 },
  linkButton: {
    backgroundColor: "#eef2ff",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 16,
    alignItems: "center",
  },
  linkButtonText: { color: "#4f46e5", fontWeight: "600" },
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
```

#### Bước 5 — Trang chi tiết BMI (`app/bmi-result.tsx`)

```jsx
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function BMIResultScreen() {
  const { bmi, height, weight, category } = useLocalSearchParams();

  const getBMIColor = () => {
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return "#3b82f6";
    if (bmiNum < 25) return "#22c55e";
    if (bmiNum < 30) return "#f59e0b";
    return "#ef4444";
  };

  const bmiScale = [
    { range: "< 18.5", label: "Thiếu cân", isActive: parseFloat(bmi) < 18.5 },
    { range: "18.5 - 24.9", label: "Bình thường", isActive: parseFloat(bmi) >= 18.5 && parseFloat(bmi) < 25 },
    { range: "25 - 29.9", label: "Thừa cân", isActive: parseFloat(bmi) >= 25 && parseFloat(bmi) < 30 },
    { range: "≥ 30", label: "Béo phì", isActive: parseFloat(bmi) >= 30 },
  ];

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
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Ngày đo:</Text>
          <Text style={styles.infoValue}>08/04/2024</Text>
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
  scaleRowActive: {
    backgroundColor: "#eef2ff",
  },
  scaleRange: { width: 100, fontSize: 14, color: "#374151" },
  scaleLabel: { flex: 1, fontSize: 14, color: "#374151" },
  scaleArrow: { fontSize: 14, color: "#4f46e5", fontWeight: "bold" },
  backButton: {
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 40,
  },
  backButtonText: { color: "#374151", fontSize: 16, fontWeight: "600" },
});
```

#### Bước 6 — Trang chi tiết Món ăn (`app/meal/[id].tsx`)

```jsx
import { View, Text, Image, Pressable, ScrollView, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

const MEALS_DATA = {
  "1": {
    name: "Phở bò tái chín",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400",
    rating: 4.8,
    time: "30 phút",
    calories: 450,
    protein: 25,
    fat: 15,
    description: "Phở bò Hà Nội truyền thống với nước dùng đậm đà, thịt bò tái chín thơm ngon.",
    ingredients: [
      { name: "Bánh phở", amount: "200g" },
      { name: "Thịt bò", amount: "150g" },
      { name: "Hành, ngò", amount: "50g" },
      { name: "Nước dùng", amount: "500ml" },
    ],
  },
  "2": {
    name: "Salad rau trộn",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    rating: 4.5,
    time: "15 phút",
    calories: 180,
    protein: 8,
    fat: 5,
    description: "Salad tươi mát với rau xanh, cà chua, dưa leo và sốt dầu giấm.",
    ingredients: [
      { name: "Xà lách", amount: "100g" },
      { name: "Cà chua", amount: "80g" },
      { name: "Dưa leo", amount: "60g" },
      { name: "Sốt dầu giấm", amount: "30ml" },
    ],
  },
};

export default function MealDetailScreen() {
  const { id } = useLocalSearchParams();
  const meal = MEALS_DATA[id] || MEALS_DATA["1"];

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
        <Text style={styles.mealMeta}>⭐ {meal.rating}  •  🕐 {meal.time}</Text>
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
        <Text style={styles.addButtonText}>➕ Thêm vào thực đơn</Text>
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
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#1a1a2e", marginBottom: 8 },
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
```

---

## Bài tập thực hành bổ sung

### Bài 1 — App Phòng khám (3 màn hình Stack)

Tạo app phòng khám với luồng:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Chọn chuyên  │────→│ Chọn bác sĩ  │────→│ Xác nhận     │
│ khoa         │     │              │     │ đặt lịch     │
└──────────────┘     └──────────────┘     └──────────────┘
     Screen 1             Screen 2             Screen 3
```

**Giao diện Screen 1 — Chọn chuyên khoa:**

```
┌─────────────────────────────────┐
│  🏥 Chọn chuyên khoa            │
│                                 │
│  ┌─────────────────────────┐    │
│  │ ❤️ Tim mạch             →│    │  ← Nhấn → push Screen 2
│  └─────────────────────────┘    │     params: { department: "Tim mạch" }
│  ┌─────────────────────────┐    │
│  │ 🦴 Cơ xương khớp        →│    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │ 👁️ Mắt                  →│    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │ 🧠 Thần kinh            →│    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

**Giao diện Screen 2 — Chọn bác sĩ:**

```
┌─────────────────────────────────┐
│  ← Quay lại    Khoa Tim mạch   │ ← Hiển thị tên khoa từ params
│                                 │
│  ┌─────────────────────────┐    │
│  │ 👨‍⚕️ BS. Trần Văn Đức     │    │
│  │ ⭐ 4.9 • 15 năm KN      │    │
│  │ 📅 Thứ 2,4,6            │    │  ← Nhấn → push Screen 3
│  └─────────────────────────┘    │     params: { department, doctor, time }
│  ┌─────────────────────────┐    │
│  │ 👩‍⚕️ BS. Nguyễn Thị Mai   │    │
│  │ ⭐ 4.7 • 10 năm KN      │    │
│  │ 📅 Thứ 3,5,7            │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

**Giao diện Screen 3 — Xác nhận:**

```
┌─────────────────────────────────┐
│  ← Quay lại    Xác nhận        │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 🏥 Khoa: Tim mạch       │    │
│  │ 👨‍⚕️ BS: Trần Văn Đức     │    │
│  │ 📅 Ngày: 10/04/2024     │    │
│  │ 🕐 Giờ: 09:00           │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │    ✅ Xác nhận đặt lịch  │    │ ← Alert + router.replace("/")
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

**Yêu cầu:**
1. Screen 1 → push Screen 2 kèm `params: { department }`.
2. Screen 2 → nhận `department` từ params, push Screen 3 kèm `params: { department, doctor }`.
3. Screen 3 → nhận cả 2, hiển thị xác nhận, nhấn OK → `router.replace("/")` (về Home, xoá hết stack).

---

### Bài 2 — Thêm Tab "Lịch sử" vào Tab Bar

Mở rộng app chính bằng cách thêm tab thứ 4:

```
├─────────────────────────────────────┤
│  🏠      🍽️      📋      👤        │
│  Home   Meals   Lịch sử  Profile   │
└─────────────────────────────────────┘
```

**Yêu cầu:**
1. Thêm file `app/(tabs)/history.tsx`.
2. Đăng ký tab trong `app/(tabs)/_layout.tsx`.
3. Hiển thị danh sách 5 lần khám bệnh gần nhất (dữ liệu giả).
4. Nhấn vào mỗi item → push sang trang chi tiết (tạo thêm `app/history-detail.tsx`).

---

### Bài 3 — Luồng Onboarding (Nâng cao)

Tạo 3 màn hình giới thiệu app khi mở lần đầu:

```
Slide 1               Slide 2               Slide 3
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│               │     │               │     │               │
│    🏃‍♂️         │     │    🍎         │     │    📊         │
│               │     │               │     │               │
│ Theo dõi      │     │ Quản lý       │     │ Thống kê      │
│ sức khỏe      │     │ dinh dưỡng    │     │ chi tiết      │
│               │     │               │     │               │
│  ● ○ ○        │     │  ○ ● ○        │     │  ○ ○ ●        │
│               │     │               │     │               │
│ [Tiếp theo →] │     │ [Tiếp theo →] │     │ [Bắt đầu!]   │
└───────────────┘     └───────────────┘     └───────────────┘
   push slide 2         push slide 3         replace → Home
```

**Yêu cầu:**
1. 3 file: `app/onboarding/step1.tsx`, `step2.tsx`, `step3.tsx`.
2. Slide 1,2: nút "Tiếp theo" → `router.push()`.
3. Slide 3: nút "Bắt đầu" → `router.replace("/(tabs)")` (không thể quay lại onboarding).
4. Mỗi slide có icon lớn, tiêu đề, mô tả ngắn, indicator dots (●○○).

---

## Ôn tập — Kiểm tra kiến thức

1. Stack Navigation và Tab Navigation khác nhau thế nào? Khi nào dùng cái nào?
2. `router.push()` và `router.replace()` khác nhau thế nào?
3. File `[id].tsx` nghĩa là gì? Cách nhận giá trị `id`?
4. Viết code: Nút chuyển từ trang A sang trang B kèm params `{name: "An", age: "22"}`.
5. `useLocalSearchParams()` trả về gì? Kiểu dữ liệu của params là gì?
6. Tại sao dùng `router.replace` sau khi onboarding mà không phải `router.push`?

---

## Xem trước chủ đề tiếp theo

Chủ đề tiếp theo sẽ học về **Dữ liệu** — JSON, mock data, FlatList:
- Cấu trúc dữ liệu JSON cho app sức khỏe.
- Tạo mock data cho thực đơn và bài viết.
- FlatList nâng cao: pull-to-refresh, separator, empty state.
