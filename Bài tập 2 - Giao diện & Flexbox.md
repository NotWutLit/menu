# GIAI ĐOẠN A – BÀI TẬP THỰC HÀNH
## Chủ đề 2: 🎨 Giao diện — View, StyleSheet, Flexbox

> **Mục tiêu:** Nắm vững hệ thống layout Flexbox trong React Native, hiểu cách dùng `View` làm container, xây dựng layout phức tạp cho trang hồ sơ sức khỏe — nền tảng để thiết kế mọi giao diện di động.

---

## Kiến thức cần nắm trước khi làm bài

### 1. View — Container vạn năng

Trong React Native, `View` là thẻ nền tảng nhất — tương đương `<div>` trên web.

```jsx
// Mọi layout đều bắt đầu từ View
<View style={styles.container}>
  <View style={styles.header}>
    <Text>Header</Text>
  </View>
  <View style={styles.body}>
    <Text>Body</Text>
  </View>
  <View style={styles.footer}>
    <Text>Footer</Text>
  </View>
</View>
```

**Đặc điểm quan trọng của View:**

| Đặc điểm | Giải thích |
|---|---|
| Mặc định `flexDirection: "column"` | Các con xếp **từ trên xuống** (khác web là `row`) |
| Không hiển thị text trực tiếp | Text phải nằm trong `<Text>` |
| Có thể lồng nhau | View trong View trong View... |
| Nhận mọi style layout | padding, margin, border, shadow... |

---

### 2. Flexbox — Hệ thống Layout của React Native

#### 2.1 flexDirection — Hướng sắp xếp

```
flexDirection: "column" (mặc định)     flexDirection: "row"
┌──────────────────┐                   ┌──────────────────┐
│ ┌──────────────┐ │                   │ ┌────┐┌────┐┌───┐│
│ │   Child 1    │ │                   │ │ C1 ││ C2 ││C3 ││
│ └──────────────┘ │                   │ └────┘└────┘└───┘│
│ ┌──────────────┐ │                   └──────────────────┘
│ │   Child 2    │ │
│ └──────────────┘ │
│ ┌──────────────┐ │
│ │   Child 3    │ │
│ └──────────────┘ │
└──────────────────┘
```

#### 2.2 justifyContent — Căn chỉnh theo trục chính

Trục chính = theo `flexDirection` (column → dọc, row → ngang).

```
justifyContent: "flex-start"    "center"         "flex-end"
┌────────────┐              ┌────────────┐    ┌────────────┐
│ ┌────────┐ │              │            │    │            │
│ │ Item 1 │ │              │ ┌────────┐ │    │            │
│ └────────┘ │              │ │ Item 1 │ │    │ ┌────────┐ │
│ ┌────────┐ │              │ └────────┘ │    │ │ Item 1 │ │
│ │ Item 2 │ │              │ ┌────────┐ │    │ └────────┘ │
│ └────────┘ │              │ │ Item 2 │ │    │ ┌────────┐ │
│            │              │ └────────┘ │    │ │ Item 2 │ │
│            │              │            │    │ └────────┘ │
└────────────┘              └────────────┘    └────────────┘

"space-between"             "space-around"    "space-evenly"
┌────────────┐              ┌────────────┐    ┌────────────┐
│ ┌────────┐ │              │            │    │            │
│ │ Item 1 │ │              │ ┌────────┐ │    │ ┌────────┐ │
│ └────────┘ │              │ │ Item 1 │ │    │ │ Item 1 │ │
│            │              │ └────────┘ │    │ └────────┘ │
│            │              │            │    │            │
│            │              │ ┌────────┐ │    │ ┌────────┐ │
│ ┌────────┐ │              │ │ Item 2 │ │    │ │ Item 2 │ │
│ │ Item 2 │ │              │ └────────┘ │    │ └────────┘ │
│ └────────┘ │              │            │    │            │
└────────────┘              └────────────┘    └────────────┘
```

#### 2.3 alignItems — Căn chỉnh theo trục phụ

Trục phụ = vuông góc với trục chính.

```
(flexDirection: "column")
alignItems: "flex-start"    "center"         "flex-end"       "stretch"
┌────────────┐            ┌────────────┐   ┌────────────┐   ┌────────────┐
│┌──────┐    │            │  ┌──────┐  │   │    ┌──────┐│   │┌──────────┐│
││Item 1│    │            │  │Item 1│  │   │    │Item 1││   ││ Item 1   ││
│└──────┘    │            │  └──────┘  │   │    └──────┘│   │└──────────┘│
│┌────┐      │            │   ┌────┐   │   │      ┌────┐│   │┌──────────┐│
││It 2│      │            │   │It 2│   │   │      │It 2││   ││ Item 2   ││
│└────┘      │            │   └────┘   │   │      └────┘│   │└──────────┘│
└────────────┘            └────────────┘   └────────────┘   └────────────┘
```

#### 2.4 flex — Phân chia không gian

```jsx
// flex: 1 → chiếm toàn bộ không gian còn lại
// flex: 2 → chiếm gấp đôi so với flex: 1

<View style={{ flex: 1 }}>
  <View style={{ flex: 1, backgroundColor: "red" }} />    {/* 1/4 */}
  <View style={{ flex: 2, backgroundColor: "green" }} />  {/* 2/4 */}
  <View style={{ flex: 1, backgroundColor: "blue" }} />   {/* 1/4 */}
</View>
```

```
┌──────────────────┐
│   flex: 1 (25%)  │  ← Đỏ
├──────────────────┤
│                  │
│   flex: 2 (50%)  │  ← Xanh lá
│                  │
├──────────────────┤
│   flex: 1 (25%)  │  ← Xanh dương
└──────────────────┘
```

#### 2.5 Bảng tổng hợp Flexbox

| Thuộc tính | Giá trị phổ biến | Ý nghĩa |
|---|---|---|
| `flexDirection` | `"column"`, `"row"` | Hướng sắp xếp con |
| `justifyContent` | `"center"`, `"space-between"`, `"flex-start"` | Căn theo trục chính |
| `alignItems` | `"center"`, `"flex-start"`, `"stretch"` | Căn theo trục phụ |
| `flex` | `1`, `2`, `3`... | Tỷ lệ chiếm không gian |
| `flexWrap` | `"wrap"`, `"nowrap"` | Có xuống dòng không |
| `gap` | `8`, `12`, `16`... | Khoảng cách giữa các con |
| `alignSelf` | `"center"`, `"flex-end"` | Căn riêng 1 phần tử |

---

### 3. Padding vs Margin — Khoảng cách

```
              margin (bên ngoài)
         ┌─────────────────────────┐
         │     padding (bên trong) │
         │   ┌─────────────────┐   │
         │   │                 │   │
         │   │    NỘI DUNG     │   │
         │   │                 │   │
         │   └─────────────────┘   │
         │                         │
         └─────────────────────────┘
```

```jsx
<View style={{
  margin: 16,        // Khoảng cách bên NGOÀI (đẩy ra xa element khác)
  padding: 20,       // Khoảng cách bên TRONG (đẩy nội dung vào trong)
  marginTop: 10,     // Chỉ margin phía trên
  paddingHorizontal: 16, // padding trái + phải
  paddingVertical: 12,   // padding trên + dưới
}}>
```

---

## 📐 BÀI TẬP CHÍNH: Trang Hồ sơ Sức khỏe

### Mô tả ứng dụng

Xây dựng trang **hồ sơ sức khỏe cá nhân** — layout phức tạp kết hợp nhiều kỹ thuật Flexbox.

---

### Giao diện mẫu — Toàn bộ trang

```
┌─────────────────────────────────────┐
│  ←  Hồ sơ sức khỏe          ⚙️    │ ← Header
├─────────────────────────────────────┤
│                                     │
│            ┌────────┐               │
│            │  📷    │               │ ← Avatar tròn
│            │ Avatar │               │
│            └────────┘               │
│          Nguyễn Văn An              │
│        🟢 Sức khỏe tốt             │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────┐┌─────────┐┌─────────┐ │
│  │  168cm  ││  65kg   ││  23     │ │ ← Stats Row
│  │Chiều cao││Cân nặng ││  Tuổi   │ │
│  └─────────┘└─────────┘└─────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Chỉ số sức khỏe                   │
│  ┌─────────────────────────────┐    │
│  │ ❤️ Nhịp tim    │    72 bpm  │    │
│  ├─────────────────────────────┤    │
│  │ 🩸 Huyết áp    │  120/80   │    │
│  ├─────────────────────────────┤    │
│  │ 🫁 SpO2        │    98%    │    │
│  ├─────────────────────────────┤    │
│  │ 🌡️ Thân nhiệt  │  36.5°C   │    │
│  └─────────────────────────────┘    │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Hoạt động hôm nay                  │
│  ┌──────────┐ ┌──────────┐          │
│  │ 🚶       │ │ 🔥       │          │
│  │ 8,245    │ │ 1,850    │          │
│  │ Bước đi  │ │ Calories │          │
│  └──────────┘ └──────────┘          │
│  ┌──────────┐ ┌──────────┐          │
│  │ 💧       │ │ 😴       │          │
│  │ 2.1L     │ │ 7h 30m   │          │
│  │ Nước uống│ │ Giấc ngủ │          │
│  └──────────┘ └──────────┘          │
│                                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │    📅 Đặt lịch khám bệnh   │    │ ← CTA Button
│  └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

---

### Hướng dẫn từng bước

#### Bước 1 — Phân tích layout thành các khối

Nhìn vào giao diện, ta chia thành **6 khối chính**:

```
┌──────────────────┐
│   1. Header      │  ← flexDirection: "row", space-between
├──────────────────┤
│   2. Profile     │  ← alignItems: "center"
├──────────────────┤
│   3. Stats Row   │  ← flexDirection: "row", space-around
├──────────────────┤
│   4. Health Info │  ← Danh sách dọc, mỗi row là flexDirection: "row"
├──────────────────┤
│   5. Activities  │  ← flexDirection: "row" + flexWrap: "wrap" (grid 2x2)
├──────────────────┤
│   6. CTA Button  │  ← alignItems: "center"
└──────────────────┘
```

> **Tư duy layout:** Luôn chia giao diện thành **các khối hình chữ nhật lồng nhau**. Mỗi khối = 1 `<View>`.

#### Bước 2 — Header (flexDirection: "row" + space-between)

```jsx
{/* === HEADER === */}
<View style={styles.header}>
  <Pressable>
    <Text style={styles.headerIcon}>←</Text>
  </Pressable>
  <Text style={styles.headerTitle}>Hồ sơ sức khỏe</Text>
  <Pressable>
    <Text style={styles.headerIcon}>⚙️</Text>
  </Pressable>
</View>
```

```jsx
header: {
  flexDirection: "row",          // Xếp ngang: ← | Tiêu đề | ⚙️
  justifyContent: "space-between", // Đẩy 3 phần tử ra 2 đầu + giữa
  alignItems: "center",          // Căn giữa theo trục dọc
  paddingHorizontal: 20,
  paddingTop: 50,
  paddingBottom: 16,
  backgroundColor: "#4f46e5",
},
```

**Minh hoạ:**

```
flexDirection: "row" + justifyContent: "space-between"
┌────────────────────────────────────┐
│ ←          Hồ sơ sức khỏe      ⚙️ │
└────────────────────────────────────┘
  ↑                ↑                ↑
flex-start       center         flex-end
```

#### Bước 3 — Profile Section (alignItems: "center")

```jsx
{/* === PROFILE === */}
<View style={styles.profileSection}>
  <Image source={{ uri: "https://i.pravatar.cc/150?img=3" }} style={styles.avatar} />
  <Text style={styles.profileName}>Nguyễn Văn An</Text>
  <View style={styles.statusBadge}>
    <Text style={styles.statusText}>🟢 Sức khỏe tốt</Text>
  </View>
</View>
```

```jsx
profileSection: {
  alignItems: "center",    // Tất cả con căn giữa ngang
  paddingVertical: 24,
  backgroundColor: "#4f46e5",
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
},
avatar: {
  width: 100,
  height: 100,
  borderRadius: 50,        // Tròn = width/2
  borderWidth: 3,
  borderColor: "#fff",
  marginBottom: 12,
},
```

#### Bước 4 — Stats Row (3 cột bằng nhau)

```jsx
{/* === STATS ROW === */}
<View style={styles.statsRow}>
  <View style={styles.statItem}>
    <Text style={styles.statValue}>168</Text>
    <Text style={styles.statUnit}>cm</Text>
    <Text style={styles.statLabel}>Chiều cao</Text>
  </View>
  <View style={styles.statDivider} />
  <View style={styles.statItem}>
    <Text style={styles.statValue}>65</Text>
    <Text style={styles.statUnit}>kg</Text>
    <Text style={styles.statLabel}>Cân nặng</Text>
  </View>
  <View style={styles.statDivider} />
  <View style={styles.statItem}>
    <Text style={styles.statValue}>23</Text>
    <Text style={styles.statUnit}>tuổi</Text>
    <Text style={styles.statLabel}>Tuổi</Text>
  </View>
</View>
```

```jsx
statsRow: {
  flexDirection: "row",        // 3 cột ngang hàng
  backgroundColor: "#fff",
  marginHorizontal: 20,
  marginTop: -20,              // Kéo lên chồng lên profile section
  borderRadius: 16,
  paddingVertical: 20,
  alignItems: "center",
  justifyContent: "space-evenly",
  // Shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 12,
  elevation: 5,
},
statItem: {
  alignItems: "center",       // Nội dung mỗi cột căn giữa
  flex: 1,                    // 3 cột bằng nhau
},
statDivider: {
  width: 1,
  height: 40,
  backgroundColor: "#e5e7eb",
},
```

**Minh hoạ layout:**

```
flexDirection: "row" + flex: 1 cho mỗi item
┌────────────┬─┬────────────┬─┬────────────┐
│   168cm    │|│   65kg     │|│   23 tuổi  │
│ Chiều cao  │|│ Cân nặng   │|│   Tuổi     │
└────────────┴─┴────────────┴─┴────────────┘
   flex: 1    |    flex: 1   |    flex: 1
```

#### Bước 5 — Chỉ số sức khỏe (Danh sách dọc, mỗi row là flex row)

```jsx
{/* === HEALTH METRICS === */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Chỉ số sức khỏe</Text>

  <View style={styles.metricCard}>
    {/* Mỗi metric row */}
    <View style={styles.metricRow}>
      <Text style={styles.metricIcon}>❤️</Text>
      <Text style={styles.metricLabel}>Nhịp tim</Text>
      <Text style={styles.metricValue}>72 bpm</Text>
    </View>

    <View style={styles.metricDivider} />

    <View style={styles.metricRow}>
      <Text style={styles.metricIcon}>🩸</Text>
      <Text style={styles.metricLabel}>Huyết áp</Text>
      <Text style={styles.metricValue}>120/80</Text>
    </View>

    <View style={styles.metricDivider} />

    <View style={styles.metricRow}>
      <Text style={styles.metricIcon}>🫁</Text>
      <Text style={styles.metricLabel}>SpO2</Text>
      <Text style={styles.metricValue}>98%</Text>
    </View>

    <View style={styles.metricDivider} />

    <View style={styles.metricRow}>
      <Text style={styles.metricIcon}>🌡️</Text>
      <Text style={styles.metricLabel}>Thân nhiệt</Text>
      <Text style={styles.metricValue}>36.5°C</Text>
    </View>
  </View>
</View>
```

```jsx
metricRow: {
  flexDirection: "row",          // Icon | Label | Value ngang hàng
  alignItems: "center",         // Căn giữa dọc
  paddingVertical: 14,
  paddingHorizontal: 16,
},
metricIcon: {
  fontSize: 20,
  width: 32,                    // Cố định width để các icon thẳng hàng
},
metricLabel: {
  flex: 1,                      // Chiếm hết khoảng trống giữa icon và value
  fontSize: 15,
  color: "#374151",
},
metricValue: {
  fontSize: 15,
  fontWeight: "bold",
  color: "#1a1a2e",
},
metricDivider: {
  height: 1,
  backgroundColor: "#f3f4f6",
  marginHorizontal: 16,
},
```

**Minh hoạ layout mỗi row:**

```
flexDirection: "row"
┌───────┬──────────────────┬──────────┐
│ ❤️    │ Nhịp tim         │  72 bpm  │
│ w:32  │ flex: 1          │          │
└───────┴──────────────────┴──────────┘
  fixed    fills space        auto
```

#### Bước 6 — Hoạt động hôm nay (Grid 2x2 bằng flexWrap)

```jsx
{/* === ACTIVITIES GRID === */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Hoạt động hôm nay</Text>

  <View style={styles.activityGrid}>
    <View style={[styles.activityCard, { backgroundColor: "#fef3c7" }]}>
      <Text style={styles.activityIcon}>🚶</Text>
      <Text style={styles.activityValue}>8,245</Text>
      <Text style={styles.activityLabel}>Bước đi</Text>
    </View>

    <View style={[styles.activityCard, { backgroundColor: "#fce7f3" }]}>
      <Text style={styles.activityIcon}>🔥</Text>
      <Text style={styles.activityValue}>1,850</Text>
      <Text style={styles.activityLabel}>Calories</Text>
    </View>

    <View style={[styles.activityCard, { backgroundColor: "#dbeafe" }]}>
      <Text style={styles.activityIcon}>💧</Text>
      <Text style={styles.activityValue}>2.1L</Text>
      <Text style={styles.activityLabel}>Nước uống</Text>
    </View>

    <View style={[styles.activityCard, { backgroundColor: "#ede9fe" }]}>
      <Text style={styles.activityIcon}>😴</Text>
      <Text style={styles.activityValue}>7h 30m</Text>
      <Text style={styles.activityLabel}>Giấc ngủ</Text>
    </View>
  </View>
</View>
```

```jsx
activityGrid: {
  flexDirection: "row",     // Xếp ngang
  flexWrap: "wrap",         // Tự xuống dòng khi hết chỗ → tạo grid
  gap: 12,                  // Khoảng cách giữa các card
},
activityCard: {
  width: "47%",             // Mỗi card chiếm ~nửa → 2 card/hàng
  borderRadius: 16,
  padding: 16,
  alignItems: "center",
},
activityIcon: {
  fontSize: 32,
  marginBottom: 8,
},
activityValue: {
  fontSize: 22,
  fontWeight: "bold",
  color: "#1a1a2e",
},
activityLabel: {
  fontSize: 12,
  color: "#666",
  marginTop: 4,
},
```

**Minh hoạ flexWrap:**

```
flexDirection: "row" + flexWrap: "wrap" + width: "47%"
┌──────────────────────────────┐
│ ┌────────────┐ ┌────────────┐│  ← Hàng 1 (2 card vừa)
│ │ 🚶 8,245   │ │ 🔥 1,850  ││
│ │ Bước đi    │ │ Calories   ││
│ └────────────┘ └────────────┘│
│ ┌────────────┐ ┌────────────┐│  ← Hàng 2 (wrap xuống)
│ │ 💧 2.1L    │ │ 😴 7h 30m  ││
│ │ Nước uống  │ │ Giấc ngủ   ││
│ └────────────┘ └────────────┘│
└──────────────────────────────┘
```

#### Bước 7 — CTA Button

```jsx
{/* === CTA BUTTON === */}
<Pressable style={styles.ctaButton}>
  <Text style={styles.ctaButtonText}>📅 Đặt lịch khám bệnh</Text>
</Pressable>
```

```jsx
ctaButton: {
  backgroundColor: "#4f46e5",
  borderRadius: 12,
  paddingVertical: 16,
  marginHorizontal: 20,
  marginTop: 8,
  marginBottom: 40,
  alignItems: "center",
},
```

---

### Code hoàn chỉnh — Trang Hồ sơ Sức khỏe

```jsx
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from "react-native";

export default function HealthProfileScreen() {
  const user = {
    name: "Nguyễn Văn An",
    avatar: "https://i.pravatar.cc/150?img=3",
    height: 168,
    weight: 65,
    age: 23,
  };

  const healthMetrics = [
    { icon: "❤️", label: "Nhịp tim", value: "72 bpm" },
    { icon: "🩸", label: "Huyết áp", value: "120/80" },
    { icon: "🫁", label: "SpO2", value: "98%" },
    { icon: "🌡️", label: "Thân nhiệt", value: "36.5°C" },
  ];

  const activities = [
    { icon: "🚶", value: "8,245", label: "Bước đi", bg: "#fef3c7" },
    { icon: "🔥", value: "1,850", label: "Calories", bg: "#fce7f3" },
    { icon: "💧", value: "2.1L", label: "Nước uống", bg: "#dbeafe" },
    { icon: "😴", value: "7h 30m", label: "Giấc ngủ", bg: "#ede9fe" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.headerIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Hồ sơ sức khỏe</Text>
        <Pressable>
          <Text style={styles.headerIcon}>⚙️</Text>
        </Pressable>
      </View>

      {/* Profile */}
      <View style={styles.profileSection}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.profileName}>{user.name}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>🟢 Sức khỏe tốt</Text>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.height}</Text>
          <Text style={styles.statUnit}>cm</Text>
          <Text style={styles.statLabel}>Chiều cao</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.weight}</Text>
          <Text style={styles.statUnit}>kg</Text>
          <Text style={styles.statLabel}>Cân nặng</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.age}</Text>
          <Text style={styles.statUnit}>tuổi</Text>
          <Text style={styles.statLabel}>Tuổi</Text>
        </View>
      </View>

      {/* Health Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chỉ số sức khỏe</Text>
        <View style={styles.metricCard}>
          {healthMetrics.map((metric, index) => (
            <View key={metric.label}>
              <View style={styles.metricRow}>
                <Text style={styles.metricIcon}>{metric.icon}</Text>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                <Text style={styles.metricValue}>{metric.value}</Text>
              </View>
              {index < healthMetrics.length - 1 && (
                <View style={styles.metricDivider} />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Activities Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hoạt động hôm nay</Text>
        <View style={styles.activityGrid}>
          {activities.map((activity) => (
            <View
              key={activity.label}
              style={[styles.activityCard, { backgroundColor: activity.bg }]}
            >
              <Text style={styles.activityIcon}>{activity.icon}</Text>
              <Text style={styles.activityValue}>{activity.value}</Text>
              <Text style={styles.activityLabel}>{activity.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA Button */}
      <Pressable style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>📅 Đặt lịch khám bệnh</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#4f46e5",
  },
  headerIcon: {
    fontSize: 20,
    color: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#4f46e5",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 12,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  statusBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#fff",
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  statUnit: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#e5e7eb",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 12,
  },
  metricCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  metricRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  metricIcon: {
    fontSize: 20,
    width: 32,
  },
  metricLabel: {
    flex: 1,
    fontSize: 15,
    color: "#374151",
  },
  metricValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  metricDivider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginHorizontal: 16,
  },
  activityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  activityCard: {
    width: "47%",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  activityIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  activityValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  activityLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  ctaButton: {
    backgroundColor: "#4f46e5",
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 40,
    alignItems: "center",
  },
  ctaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
```

---

## Bài tập thực hành bổ sung

### Bài 1 — Thẻ Thông tin Bệnh nhân

Tạo card thông tin bệnh nhân cho hệ thống bệnh viện:

```
┌─────────────────────────────────────┐
│                                     │
│  ┌────────┐  Nguyễn Thị Mai        │
│  │  📷    │  Giới tính: Nữ         │
│  │ Avatar │  Ngày sinh: 15/03/1995 │
│  └────────┘  Mã BN: BN-2024-0012  │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🏥 Khoa:    Nội tổng hợp   │    │
│  │ 🛏️ Phòng:   305-A          │    │
│  │ 👨‍⚕️ BS:      Trần Văn Đức   │    │
│  │ 📅 Nhập:    02/04/2024     │    │
│  └─────────────────────────────┘    │
│                                     │
│  Dị ứng: Penicilin, Hải sản        │
│  ┌─────────────────┐               │
│  │ ⚠️ Có dị ứng    │               │
│  └─────────────────┘               │
│                                     │
└─────────────────────────────────────┘
```

**Yêu cầu layout:**
1. Phần đầu: Avatar bên trái + Thông tin bên phải → `flexDirection: "row"`.
2. Phần giữa: 4 dòng thông tin → danh sách dọc, mỗi dòng dùng `flexDirection: "row"` với icon cố định width.
3. Badge dị ứng: `alignSelf: "flex-start"`, nền vàng, bo tròn.
4. Card tổng thể có shadow và bo tròn.

---

### Bài 2 — Dashboard Thống kê (Grid Layout)

Tạo dashboard thống kê sức khỏe gia đình:

```
┌─────────────────────────────────────┐
│   👨‍👩‍👧‍👦 Sức khỏe Gia đình           │
│                                     │
│  ┌────────────────┐┌────────────────┐│
│  │ 👤 Bố          ││ 👤 Mẹ         ││
│  │ BMI: 24.5      ││ BMI: 21.2     ││
│  │ 🟢 Bình thường ││ 🟢 Bình thường││
│  └────────────────┘└────────────────┘│
│  ┌────────────────┐┌────────────────┐│
│  │ 👤 Con gái     ││ 👤 Con trai   ││
│  │ BMI: 18.0      ││ BMI: 19.8     ││
│  │ 🔵 Thiếu cân   ││ 🟢 Bình thường││
│  └────────────────┘└────────────────┘│
│                                     │
│  Tổng quan:                          │
│  ┌─────────────────────────────┐    │
│  │ ✅ 3/4 thành viên khỏe mạnh │    │
│  │ ⚠️ 1 thành viên cần chú ý   │    │
│  └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

**Yêu cầu:**
1. Grid 2x2 cho 4 thành viên → `flexDirection: "row"` + `flexWrap: "wrap"`.
2. Mỗi card chiếm 47% width.
3. Màu border card thay đổi theo phân loại BMI (xanh, cam, đỏ, xanh dương).
4. Phần "Tổng quan" tự động đếm số thành viên khỏe mạnh từ dữ liệu.

---

### Bài 3 — Layout Lịch sử Khám bệnh (Nâng cao)

Tạo giao diện lịch sử khám bệnh dạng timeline:

```
┌─────────────────────────────────────┐
│  📋 Lịch sử khám bệnh              │
│                                     │
│  ● ─── 15/03/2024 ────────────────  │
│  │  ┌─────────────────────────┐     │
│  │  │ 🏥 Bệnh viện Bạch Mai  │     │
│  │  │ 👨‍⚕️ BS. Trần Văn Đức    │     │
│  │  │ 📝 Khám tổng quát      │     │
│  │  │ ✅ Kết quả: Bình thường │     │
│  │  └─────────────────────────┘     │
│  │                                  │
│  ● ─── 20/01/2024 ────────────────  │
│  │  ┌─────────────────────────┐     │
│  │  │ 🏥 Phòng khám Đa khoa  │     │
│  │  │ 👨‍⚕️ BS. Nguyễn Thị Lan  │     │
│  │  │ 📝 Viêm họng            │     │
│  │  │ 💊 Đã điều trị          │     │
│  │  └─────────────────────────┘     │
│  │                                  │
│  ● ─── 05/11/2023 ────────────────  │
│     ┌─────────────────────────┐     │
│     │ 🏥 Bệnh viện 115       │     │
│     │ 👨‍⚕️ BS. Lê Minh Hoàng   │     │
│     │ 📝 Đau bụng            │     │
│     │ 💊 Đã điều trị          │     │
│     └─────────────────────────┘     │
│                                     │
└─────────────────────────────────────┘
```

**Yêu cầu layout:**
1. Timeline dọc: mỗi item gồm chấm tròn + đường kẻ dọc + card.
2. Dùng `flexDirection: "row"` cho mỗi timeline item:
   - Cột trái (w: 30): chấm tròn (View border-radius) + đường dọc (View height 100%, width 2).
   - Cột phải (flex: 1): card thông tin.
3. Đường kẻ dọc nối các chấm tròn liên tục (item cuối không có đường).
4. Mảng dữ liệu ít nhất 3 lần khám, render bằng `.map()`.

**Gợi ý layout cho mỗi timeline item:**

```jsx
<View style={{ flexDirection: "row" }}>
  {/* Cột timeline */}
  <View style={{ alignItems: "center", width: 30 }}>
    <View style={styles.dot} />
    {!isLast && <View style={styles.line} />}
  </View>
  {/* Cột nội dung */}
  <View style={{ flex: 1, marginLeft: 12, marginBottom: 20 }}>
    <Text style={styles.date}>{item.date}</Text>
    <View style={styles.timelineCard}>
      {/* ... nội dung card ... */}
    </View>
  </View>
</View>
```

---

## Ôn tập — Kiểm tra kiến thức

1. `flexDirection: "column"` và `flexDirection: "row"` khác nhau thế nào? Cái nào là mặc định?
2. `justifyContent` và `alignItems` căn chỉnh theo trục nào?
3. `flex: 1` nghĩa là gì? Nếu 3 View con đều có `flex: 1` thì mỗi cái chiếm bao nhiêu?
4. Sự khác nhau giữa `padding` và `margin`?
5. Viết style cho layout 3 cột bằng nhau nằm ngang, cách nhau 12px.
6. `flexWrap: "wrap"` dùng khi nào? Cho ví dụ.

---

## Xem trước chủ đề tiếp theo

Chủ đề tiếp theo sẽ học về **Điều hướng (Navigation)** — cách chuyển giữa các màn hình:
- Cài đặt React Navigation / Expo Router.
- Stack Navigation: đi sâu vào chi tiết.
- Tab Navigation: bottom tabs.
- Truyền dữ liệu giữa các màn hình.
