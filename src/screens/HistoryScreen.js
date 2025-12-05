import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const TRANSACTIONS = [
  {
    id: 1,
    type: "passagem",
    title: "Passagem",
    subtitle: "Ônibus",
    amount: -4.8,
    date: "Hoje",
  },
  {
    id: 2,
    type: "passagem",
    title: "Passagem",
    subtitle: "5 de mai.",
    amount: -4.8,
    date: "5 de mai",
  },
  {
    id: 3,
    type: "passagem",
    title: "Passagem",
    subtitle: "4 de nov.",
    amount: -4.8,
    date: "4 de nov",
  },
  {
    id: 4,
    type: "recarga",
    title: "Recarga",
    subtitle: "4 de out.",
    amount: 4.8,
    date: "4 de out",
  },
  {
    id: 5,
    type: "recarga",
    title: "Recarga",
    subtitle: "4 de out.",
    amount: 4.8,
    date: "4 de out",
  },
  {
    id: 6,
    type: "passagem",
    title: "Passagem",
    subtitle: "4 de out.",
    amount: -4.8,
    date: "4 de out",
  },
];

export default function HistoryScreen({ navigation }) {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          {/* Header */}
          <View className="header" style={styles.header}>
            <TouchableOpacity
              onPress={handleBack}
              activeOpacity={0.7}
              style={styles.backButton}
            >
              <Feather name="arrow-left" size={22} color="#9ca3af" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Histórico</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Transactions */}
          <View style={styles.list}>
            {TRANSACTIONS.map((transaction) => {
              const isPassagem = transaction.type === "passagem";
              const isPositive = transaction.amount > 0;

              return (
                <View key={transaction.id} style={styles.card}>
                  {/* Icon */}
                  <View
                    style={[
                      styles.iconWrapper,
                      isPassagem
                        ? styles.iconBgPassagem
                        : styles.iconBgRecarga,
                    ]}
                  >
                    {isPassagem ? (
                      <Ionicons
                        name="bus"
                        size={24}
                        color={isPassagem ? "#ef4444" : "#3b82f6"}
                      />
                    ) : (
                      <Feather
                        name="credit-card"
                        size={24}
                        color={isPassagem ? "#ef4444" : "#3b82f6"}
                      />
                    )}
                  </View>

                  {/* Info */}
                  <View style={styles.info}>
                    <Text style={styles.title}>{transaction.title}</Text>
                    <Text style={styles.subtitle}>{transaction.subtitle}</Text>
                  </View>

                  {/* Amount + date */}
                  <View style={styles.amountWrapper}>
                    <Text
                      style={[
                        styles.amount,
                        isPositive
                          ? styles.amountPositive
                          : styles.amountNegative,
                      ]}
                    >
                      {isPositive ? "+" : ""}
                      R$ {Math.abs(transaction.amount).toFixed(2)}
                    </Text>
                    <Text style={styles.date}>{transaction.date}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#020617", // slate-900
  },
  scroll: {
    flex: 1,
  },
  contentWrapper: {
    maxWidth: 420,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: "#f9fafb",
    fontSize: 18,
    fontWeight: "700",
  },

  // List
  list: {
    gap: 10,
  },
  card: {
    backgroundColor: "#0f172a", // slate-800
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#1f2937",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  // Icon
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBgPassagem: {
    backgroundColor: "rgba(239,68,68,0.2)", // red-500/20
  },
  iconBgRecarga: {
    backgroundColor: "rgba(59,130,246,0.2)", // blue-500/20
  },

  // Info
  info: {
    flex: 1,
  },
  title: {
    color: "#f9fafb",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 12,
  },

  // Amount
  amountWrapper: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 14,
    fontWeight: "600",
  },
  amountPositive: {
    color: "#60a5fa", // blue-400
  },
  amountNegative: {
    color: "#f87171", // red-400
  },
  date: {
    marginTop: 2,
    color: "#6b7280",
    fontSize: 11,
  },
});
