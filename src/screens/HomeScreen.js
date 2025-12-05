import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const RECENT_TRANSACTIONS = [
  {
    id: 1,
    type: "passagem",
    title: "Passagem",
    subtitle: "Ônibus",
    amount: -4.8,
  },
  {
    id: 2,
    type: "passagem",
    title: "Passagem",
    subtitle: "5 de mai.",
    amount: -4.8,
  },
  {
    id: 3,
    type: "passagem",
    title: "Passagem",
    subtitle: "4 de nov.",
    amount: -4.8,
  },
  {
    id: 4,
    type: "recarga",
    title: "Recarga",
    subtitle: "4 de out.",
    amount: 4.8,
  },
  {
    id: 5,
    type: "recarga",
    title: "Recarga",
    subtitle: "4 de out.",
    amount: 4.8,
  },
];

export default function HomeScreen({ navigation }) {
  const [showBalance, setShowBalance] = useState(true);
  const [nfcActive, setNfcActive] = useState(false);
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState("0.00");

  useEffect(() => {
    // Web: pegava do localStorage
    // Aqui, por enquanto, vamos simular os dados do login
    // Depois podemos ligar com AsyncStorage se você quiser
    setUser({ name: "Eric" });
    setBalance("1046.50");
  }, []);

  const handlePayment = () => {
    // Web: ativava NFC e, no onComplete, debitava 4.8
    // Aqui vamos simplificar: apertou PAGAR → debita 4.8
    const newBalance = (parseFloat(balance) - 4.8).toFixed(2);
    setBalance(newBalance);
    setNfcActive(true);
    setTimeout(() => setNfcActive(false), 1500);
  };

  if (!user) {
    return (
      <View style={styles.loadingRoot}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {/* “Overlay” simples de NFC ativo */}
      {nfcActive && (
        <View style={styles.nfcOverlay}>
          <View style={styles.nfcCard}>
            <Text style={styles.nfcTitle}>Processando pagamento...</Text>
            <Text style={styles.nfcSubtitle}>Aproxime seu cartão/NFC</Text>
          </View>
        </View>
      )}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerHello}>Olá, {user.name}</Text>
              <Text style={styles.headerTitle}>Carteira Digital</Text>
            </View>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>💳</Text>
            </View>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceWrapper}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceAccent} />

            <View style={styles.balanceContent}>
              <Text style={styles.balanceLabel}>Saldo Disponível</Text>

              <View style={styles.balanceRow}>
                <Text style={styles.balanceValue}>
                  {showBalance ? `R$ ${balance}` : "R$ ••••"}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowBalance((prev) => !prev)}
                  activeOpacity={0.7}
                >
                  {showBalance ? (
                    <Feather name="eye" size={24} color="#9ca3af" />
                  ) : (
                    <Feather name="eye-off" size={24} color="#9ca3af" />
                  )}
                </TouchableOpacity>
              </View>

              {/* Quick Actions */}
              <View style={styles.quickActions}>
                <TouchableOpacity
                  style={styles.outlineButton}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Recharge")}
                >
                  <Feather name="credit-card" size={18} color="#e5e7eb" />
                  <Text style={styles.outlineButtonText}>Recarga</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.outlineButton}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("History")}
                >
                  <Text style={styles.historyIcon}>📋</Text>
                  <Text style={styles.outlineButtonText}>Histórico</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Button */}
        <View style={styles.payWrapper}>
          <TouchableOpacity
            style={styles.payButton}
            activeOpacity={0.85}
            onPress={handlePayment}
          >
            <Text style={styles.payIcon}>📡</Text>
            <Text style={styles.payText}>PAGAR (Ativar NFC)</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsWrapper}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Últimos lançamentos</Text>

            <TouchableOpacity
              style={styles.transactionsSeeMore}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("History")}
            >
              <Text style={styles.transactionsSeeMoreText}>Ver mais</Text>
              <Feather name="chevron-right" size={18} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsList}>
            {RECENT_TRANSACTIONS.map((transaction) => {
              const isPassagem = transaction.type === "passagem";
              const isPositive = transaction.amount > 0;

              return (
                <View key={transaction.id} style={styles.transactionCard}>
                  <View
                    style={[
                      styles.transactionIconWrapper,
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

                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionTitle}>
                      {transaction.title}
                    </Text>
                    <Text style={styles.transactionSubtitle}>
                      {transaction.subtitle}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.transactionAmount,
                      isPositive
                        ? styles.amountPositive
                        : styles.amountNegative,
                    ]}
                  >
                    {isPositive ? "+" : ""}
                    R$ {Math.abs(transaction.amount).toFixed(2)}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.bottomNavInner}>
          <TouchableOpacity
            style={[styles.navItem, styles.navItemActive]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Home")}
          >
            <Feather name="home" size={22} color="#f97373" />
            <Text style={styles.navItemActiveText}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Recharge")}
          >
            <Feather name="credit-card" size={22} color="#9ca3af" />
            <Text style={styles.navItemText}>Recarga</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Profile")}
          >
            <Feather name="user" size={22} color="#9ca3af" />
            <Text style={styles.navItemText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  loadingRoot: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#f9fafb",
  },

  // NFC overlay
  nfcOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,23,42,0.85)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  nfcCard: {
    backgroundColor: "#0f172a",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  nfcTitle: {
    color: "#e5e7eb",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  nfcSubtitle: {
    color: "#9ca3af",
    fontSize: 13,
  },

  // Header
  headerWrapper: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerHello: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 4,
  },
  headerTitle: {
    color: "#f9fafb",
    fontSize: 22,
    fontWeight: "700",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  headerAvatarText: {
    color: "#fff",
    fontSize: 18,
  },

  // Balance
  balanceWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  balanceCard: {
    backgroundColor: "#020617",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    overflow: "hidden",
  },
  balanceAccent: {
    position: "absolute",
    right: -60,
    top: -60,
    width: 150,
    height: 150,
    backgroundColor: "rgba(239,68,68,0.15)",
    borderRadius: 999,
  },
  balanceContent: {
    position: "relative",
    zIndex: 2,
  },
  balanceLabel: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceValue: {
    color: "#f9fafb",
    fontSize: 30,
    fontWeight: "700",
  },
  quickActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  outlineButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#4b5563",
    backgroundColor: "rgba(15,23,42,0.7)",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  outlineButtonText: {
    color: "#e5e7eb",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  historyIcon: {
    fontSize: 16,
  },

  // Payment
  payWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  payButton: {
    height: 56,
    borderRadius: 999,
    backgroundColor: "#ef4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  payIcon: {
    marginRight: 8,
    fontSize: 18,
  },
  payText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },

  // Transactions
  transactionsWrapper: {
    paddingHorizontal: 16,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  transactionsTitle: {
    color: "#f9fafb",
    fontSize: 16,
    fontWeight: "600",
  },
  transactionsSeeMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  transactionsSeeMoreText: {
    color: "#9ca3af",
    fontSize: 13,
  },
  transactionsList: {
    gap: 8,
  },
  transactionCard: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#1f2937",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  transactionIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBgPassagem: {
    backgroundColor: "rgba(239,68,68,0.2)",
  },
  iconBgRecarga: {
    backgroundColor: "rgba(59,130,246,0.2)",
  },
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
  transactionAmount: {
    fontSize: 14,
    fontWeight: "600",
  },
  amountPositive: {
    color: "#60a5fa",
  },
  amountNegative: {
    color: "#f87171",
  },

  // Bottom nav
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
    backgroundColor: "#020617",
    paddingBottom: 8,
    paddingTop: 4,
  },
  bottomNavInner: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  navItem: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  navItemActive: {
    backgroundColor: "rgba(248,113,113,0.2)",
  },
  navItemText: {
    marginTop: 2,
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: "500",
  },
  navItemActiveText: {
    marginTop: 2,
    fontSize: 11,
    color: "#fca5a5",
    fontWeight: "600",
  },
});
