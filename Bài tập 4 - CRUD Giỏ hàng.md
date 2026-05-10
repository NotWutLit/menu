# GIAI ĐOẠN A – BÀI TẬP THỰC HÀNH
## Chủ đề 4: 🛒 CRUD Giỏ hàng — State dùng chung & Quản lý thực đơn

> **Mục tiêu:** Hiểu cách quản lý dữ liệu dùng chung giữa nhiều màn hình, áp dụng CRUD vào app thực đơn, và xây dựng luồng thêm món, chỉnh sửa số phần, ghi chú, đánh dấu trạng thái, xóa món khỏi giỏ hàng.

---

## Kiến thức cần nắm trước khi làm bài

### 1. Vì sao cần state dùng chung?

Ở bài Navigation, ta mới giải quyết chuyện **đi từ màn A sang màn B**.

Nhưng khi app có luồng như sau:

```
Meals List ──→ Meal Detail ──→ Cart
    │              │            │
    └──── thêm món ┴──── thêm món ┘
```

thì nảy sinh vấn đề:

- Thêm món ở `Meals` thì `Cart` phải thấy ngay.
- Thêm món ở `Meal Detail` thì quay lại `Meals` cũng phải thấy số lượng đã đổi.
- Sửa ghi chú ở `Cart` thì dữ liệu đó phải nằm ở một nơi chung.

Nếu mỗi màn giữ `useState` riêng, dữ liệu sẽ **bị tách rời**.

**Giải pháp:** Đưa state lên một nơi chung bằng **Context + useReducer**.

---

### 2. CRUD là gì?

CRUD là 4 thao tác cơ bản với dữ liệu:

| Ký hiệu | Tên | Ý nghĩa trong giỏ hàng |
|---|---|---|
| `C` | Create | Thêm món vào giỏ |
| `R` | Read | Xem danh sách món đã chọn |
| `U` | Update | Sửa số phần, sửa ghi chú, đổi trạng thái |
| `D` | Delete | Xóa một món hoặc xóa toàn bộ |

Với app này, giỏ hàng hoạt động rất giống **TodoList**:

- `Add todo` → `Add meal`
- `Edit todo text` → `Edit note / quantity`
- `Mark done` → `Mark ordered`
- `Delete todo` → `Remove meal`

---

### 3. Khi nào nên dùng Context?

Context phù hợp khi:

- Nhiều màn hình cùng cần một dữ liệu.
- Dữ liệu không nên truyền thủ công qua quá nhiều props.
- App ở mức nhỏ đến trung bình, chưa cần Redux/Zustand.

Trong bài này:

```
CartProvider
├── Tab Meals
├── Screen Meal Detail
└── Tab Cart
```

Mọi màn đều truy cập cùng một state `items`.

---

### 4. `useReducer` giúp gì?

Khi state có nhiều thao tác cập nhật khác nhau, `useReducer` rõ ràng hơn `useState`.

Ví dụ:

```tsx
type CartAction =
  | { type: "ADD_MEAL"; meal: Meal }
  | { type: "UPDATE_QUANTITY"; mealId: string; nextQuantity: number }
  | { type: "UPDATE_NOTE"; mealId: string; note: string }
  | { type: "TOGGLE_ORDERED"; mealId: string }
  | { type: "REMOVE_MEAL"; mealId: string }
  | { type: "CLEAR_CART" };
```

Mỗi action tương ứng đúng một nghiệp vụ CRUD.

---

## 📐 BÀI TẬP CHÍNH: Giỏ hàng thực đơn có CRUD đầy đủ

### Mô tả ứng dụng

Nâng cấp app sức khỏe hiện tại bằng cách thêm tab `Cart`:

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ 🍽️ Meals     │─────→│ 📝 Detail    │─────→│ 🛒 Cart      │
│ Danh sách món│      │ 1 món ăn     │      │ CRUD giỏ hàng│
└──────────────┘      └──────────────┘      └──────────────┘
      │                        │                     │
      └──────────── add meal ──┴─────────────────────┘
```

### Chức năng bắt buộc

1. Thêm món từ `Meals`.
2. Thêm món từ `Meal Detail`.
3. Xem tổng số phần và tổng calories trong `Cart`.
4. Tăng / giảm số phần của từng món.
5. Sửa ghi chú cho từng món.
6. Đánh dấu món là `Đã chốt` hoặc `Chưa chốt`.
7. Xóa một món.
8. Xóa toàn bộ giỏ hàng.

---

### Cấu trúc thư mục đề xuất

```bash
app/
├── _layout.tsx
├── meal/
│   └── [id].tsx
├── (tabs)/
│   ├── _layout.tsx
│   ├── meals.tsx
│   ├── cart.tsx
│   └── profile.tsx
contexts/
└── cart-context.tsx
constants/
└── meal.ts
```

---

### Mô hình dữ liệu

```tsx
type CartItem = {
  id: string;
  name: string;
  calories: number;
  time: string;
  rating: number;
  emoji: string;
  quantity: number;
  note: string;
  isOrdered: boolean;
};
```

**Ý nghĩa các field:**

| Field | Vai trò |
|---|---|
| `quantity` | Số phần ăn |
| `note` | Ghi chú người dùng nhập |
| `isOrdered` | Trạng thái giống `done` trong TodoList |

---

### Giao diện mẫu — Tab Meals

```
┌─────────────────────────────────────┐
│ 🍽️ Thực đơn                         │
│ 6 món ăn gợi ý                      │
│                                     │
│ ┌───────────────────────────────┐   │
│ │ 🛒 Giỏ món ăn hôm nay         │   │
│ │ 3 phần • 1150 kcal            │   │
│ │                     [Mở giỏ]  │   │
│ └───────────────────────────────┘   │
│                                     │
│ ┌───────────────────────────────┐   │
│ │ 🍜 Phở bò tái chín            │   │
│ │ ⭐ 4.8 • 🕐 30 phút           │   │
│ │ Trong giỏ: 1 phần             │   │
│ │ [Xem chi tiết] [Thêm vào giỏ] │   │
│ └───────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

### Giao diện mẫu — Tab Cart

```
┌─────────────────────────────────────┐
│ 🛒 Giỏ hàng                         │
│ CRUD món ăn theo kiểu TodoList      │
│                         [Xóa hết]   │
│                                     │
│ ┌────────┐┌────────┐┌────────────┐  │
│ │ 2 món  ││ 3 phần ││ 1150 kcal  │  │
│ └────────┘└────────┘└────────────┘  │
│                                     │
│ ┌───────────────────────────────┐   │
│ │ 🍜 Phở bò tái chín            │   │
│ │ 450 kcal/phần • 30 phút       │   │
│ │ [Chưa chốt]                   │   │
│ │ Số phần      [-] 1 [+]        │   │
│ │ Ghi chú: ít hành              │   │
│ │ Tổng: 450 kcal     [Xóa món]  │   │
│ └───────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## Hướng dẫn từng bước

### Bước 1 — Tạo type `Meal` trong `constants/meal.ts`

```tsx
export type Meal = {
  id: string;
  name: string;
  calories: number;
  time: string;
  rating: number;
  emoji: string;
};

export const MEALS: Meal[] = [...];
```

Làm vậy để `Meals`, `Detail`, `Cart` dùng chung đúng một kiểu dữ liệu.

---

### Bước 2 — Tạo `CartProvider` (`contexts/cart-context.tsx`)

```tsx
const CartContext = createContext<CartContextValue | undefined>(undefined);

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_MEAL":
    case "UPDATE_QUANTITY":
    case "UPDATE_NOTE":
    case "TOGGLE_ORDERED":
    case "REMOVE_MEAL":
    case "CLEAR_CART":
  }
}
```

**Giải thích:**

- `createContext` tạo nơi chia sẻ state.
- `useReducer` gom logic cập nhật vào một chỗ.
- `useCart()` là custom hook để màn hình dùng lại cho gọn.

---

### Bước 3 — Bọc app bằng Provider trong `app/_layout.tsx`

```tsx
export default function RootLayout() {
  return (
    <CartProvider>
      <ThemeProvider>
        <Stack>{/* routes */}</Stack>
      </ThemeProvider>
    </CartProvider>
  );
}
```

Nếu không bọc provider ở đây, `Meals`, `Detail`, `Cart` sẽ không dùng chung được dữ liệu.

---

### Bước 4 — Thêm tab `cart` trong `app/(tabs)/_layout.tsx`

```tsx
<Tabs.Screen
  name="cart"
  options={{
    title: "Giỏ hàng",
    tabBarBadge: totalItems > 0 ? totalItems : undefined,
    tabBarIcon: ({ color }) => <Text style={{ color }}>🛒</Text>,
  }}
/>
```

`tabBarBadge` là điểm rất hay để user thấy ngay số phần đang có trong giỏ.

---

### Bước 5 — Nâng cấp `app/(tabs)/meals.tsx`

Ở màn `Meals`, ta làm 2 việc:

1. Hiển thị summary của giỏ.
2. Cho phép quick-add từng món.

```tsx
const { addMeal, totalItems, totalCalories, getItemQuantity } = useCart();

<Pressable onPress={() => addMeal(meal)}>
  <Text>+ Thêm vào giỏ</Text>
</Pressable>
```

**Ý nghĩa:** user không cần vào màn chi tiết vẫn thêm món được.

---

### Bước 6 — Nâng cấp `app/meal/[id].tsx`

Ở màn chi tiết món ăn:

- Bấm nút để thêm món vào giỏ.
- Nếu món đã có, hiển thị số phần hiện tại.
- Thêm nút đi thẳng sang `Cart`.

```tsx
const quantityInCart = getItemQuantity(summaryMeal.id);

const handleAddToCart = () => {
  addMeal(summaryMeal);
};
```

Đây là ví dụ điển hình của shared state:

- Thêm ở `Detail`
- Quay lại `Meals`
- Badge vẫn tăng đúng

---

### Bước 7 — Tạo màn `app/(tabs)/cart.tsx`

Đây là nơi tập trung toàn bộ CRUD:

```tsx
const {
  items,
  updateQuantity,
  updateNote,
  toggleOrdered,
  removeMeal,
  clearCart,
} = useCart();
```

#### 7.1 Create

Không tạo item mới trực tiếp ở `Cart`, mà tạo từ `Meals` hoặc `Detail`.

#### 7.2 Read

```tsx
items.map((item) => (
  <View key={item.id}>
    <Text>{item.name}</Text>
  </View>
))
```

#### 7.3 Update

```tsx
updateQuantity(item.id, item.quantity + 1);
updateNote(item.id, value);
toggleOrdered(item.id);
```

#### 7.4 Delete

```tsx
removeMeal(item.id);
clearCart();
```

---

## Những lỗi thường gặp

### Lỗi 1 — `useCart must be used inside CartProvider`

**Nguyên nhân:** Quên bọc `<CartProvider>` trong `app/_layout.tsx`.

### Lỗi 2 — Bấm thêm món nhưng `Cart` không đổi

**Nguyên nhân:** Vẫn đang giữ state local trong từng màn thay vì Context.

### Lỗi 3 — Giảm số phần xuống 0 nhưng item không biến mất

**Cách xử lý:** Trong reducer, nếu `nextQuantity <= 0` thì trả về mảng đã bỏ item đó.

---

## Bài tập mở rộng

### Bài 1 — Thêm bộ lọc trạng thái

Thêm 3 nút:

- `Tất cả`
- `Chưa chốt`
- `Đã chốt`

để lọc danh sách món trong `Cart`.

### Bài 2 — Lưu dữ liệu khi tắt app

Tích hợp `AsyncStorage` để giỏ hàng không bị mất sau khi reload app.

### Bài 3 — Chỉnh sửa trực tiếp tên món tự tạo

Cho phép user thêm một món custom kiểu:

```tsx
{ name: "Sữa chua Hy Lạp", calories: 120 }
```

để CRUD gần hơn với TodoList nguyên bản.

---

## Tự kiểm tra sau khi làm xong

1. Thêm món ở `Meals` có sang `Cart` ngay không?
2. Thêm món ở `Detail` có tăng badge tab không?
3. Giảm số phần xuống `0` có tự xóa item không?
4. Ghi chú nhập vào có cập nhật đúng item không?
5. Bấm `Đã chốt` có đổi trạng thái giống Todo done không?
6. Bấm `Xóa hết` có reset toàn bộ summary không?

---

## Kết luận

Qua bài này, bạn luyện được 3 ý rất quan trọng:

1. Navigation chỉ giải quyết chuyện **đi qua màn hình**.
2. App nhiều màn hình cần thêm **shared state** để dữ liệu đồng bộ.
3. `Context + useReducer` là nền tảng rất tốt để làm các bài CRUD thực tế trước khi học state manager lớn hơn.
