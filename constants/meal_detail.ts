export const MEALS_DATA: Record<
  string,
  {
    name: string;
    image: string;
    rating: number;
    time: string;
    calories: number;
    protein: number;
    fat: number;
    description: string;
    ingredients: { name: string; amount: string }[];
  }
> = {
  "1": {
    name: "Phở bò tái chín",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400",
    rating: 4.8,
    time: "30 phút",
    calories: 450,
    protein: 25,
    fat: 15,
    description:
      "Phở bò Hà Nội truyền thống với nước dùng đậm đà, thịt bò tái chín thơm ngon.",
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
    description:
      "Salad tươi mát với rau xanh, cà chua, dưa leo và sốt dầu giấm.",
    ingredients: [
      { name: "Xà lách", amount: "100g" },
      { name: "Cà chua", amount: "80g" },
      { name: "Dưa leo", amount: "60g" },
      { name: "Sốt dầu giấm", amount: "30ml" },
    ],
  },
  "3": {
    name: "Cơm gà xối mỡ",
    image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400",
    rating: 4.7,
    time: "20 phút",
    calories: 520,
    protein: 30,
    fat: 18,
    description: "Cơm gà xối mỡ giòn rụm, thịt mềm ngọt, ăn kèm cơm trắng dẻo.",
    ingredients: [
      { name: "Gà", amount: "200g" },
      { name: "Cơm trắng", amount: "200g" },
      { name: "Dầu ăn", amount: "50ml" },
      { name: "Gia vị", amount: "vừa đủ" },
    ],
  },
  "4": {
    name: "Bún bò Huế",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400",
    rating: 4.9,
    time: "35 phút",
    calories: 480,
    protein: 28,
    fat: 16,
    description: "Bún bò Huế cay nồng đặc trưng, nước dùng đỏ au, thịt bò mềm.",
    ingredients: [
      { name: "Bún tươi", amount: "200g" },
      { name: "Thịt bò", amount: "120g" },
      { name: "Chả lụa", amount: "60g" },
      { name: "Sả, ớt", amount: "vừa đủ" },
    ],
  },
  "5": {
    name: "Bánh mì thịt",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
    rating: 4.6,
    time: "10 phút",
    calories: 320,
    protein: 18,
    fat: 10,
    description: "Bánh mì Việt Nam giòn rụm, nhân thịt nguội, pate, rau thơm.",
    ingredients: [
      { name: "Bánh mì", amount: "1 ổ" },
      { name: "Thịt nguội", amount: "80g" },
      { name: "Pate", amount: "30g" },
      { name: "Rau thơm", amount: "vừa đủ" },
    ],
  },
  "6": {
    name: "Smoothie trái cây",
    image: "https://images.unsplash.com/photo-1638176066959-e96ba62b0a2b?w=400",
    rating: 4.4,
    time: "5 phút",
    calories: 150,
    protein: 4,
    fat: 2,
    description: "Sinh tố trái cây tươi ngon, giàu vitamin, thanh mát.",
    ingredients: [
      { name: "Xoài", amount: "100g" },
      { name: "Chuối", amount: "1 quả" },
      { name: "Sữa chua", amount: "100g" },
      { name: "Đá", amount: "vừa đủ" },
    ],
  },
};
