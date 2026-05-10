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
