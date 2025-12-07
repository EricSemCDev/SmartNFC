import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

import { auth } from "../firebase";
import { getUserTransactions } from "../services/transactionService";

export default function HistoryScreen({ navigation }) {
  const [list, setList] = useState([]);

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    async function load() {
      try {
        const uid = auth.currentUser.uid;
        const history = await getUserTransactions(uid);
        setList(history);
      } catch (e) {
        console.log("Erro ao carregar histórico:", e);
      }
    }

    load();
  }, []);

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          {/* Header */}
          <View style={styles.header}>
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
            {list.map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View
                  style={[
                    styles.transactionIconWrapper,
                    transaction.type === "passagem"
                      ? styles.iconBgPassagem
                      : styles.iconBgRecarga,
                  ]}
                >
                  {transaction.type === "passagem" ? (
                    <Ionicons name="bus" size={24} color="#ef4444" />
                  ) : (
                    <Feather name="credit-card" size={24} color="#3b82f6" />
                  )}
                </View>

                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>
                    {transaction.type === "passagem" ? "Passagem" : "Recarga"}
                  </Text>
                  <Text style={styles.transactionSubtitle}>
                    {new Date(transaction.timestamp).toLocaleString("pt-BR")}
                  </Text>
                </View>

                <View style={styles.amountWrapper}>
                  <Text
                    style={[
                      styles.transactionAmount,
                      transaction.amount > 0
                        ? styles.amountPositive
                        : styles.amountNegative,
                    ]}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    R$ {Math.abs(transaction.amount).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
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

  // Card
  transactionCard: {
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
  transactionIconWrapper: {
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
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    color: "#f9fafb",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  transactionSubtitle: {
    color: "#9ca3af",
    fontSize: 12,
  },

  // Amount
  amountWrapper: {
    alignItems: "flex-end",
  },
  transactionAmount: {
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
