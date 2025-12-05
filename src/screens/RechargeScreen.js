import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const PRESET_AMOUNTS = [10, 20, 50, 100, 200, 500];

export default function RechargeScreen({ navigation }) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // por enquanto, vamos só simular o saldo atual (igual ao web inicial)
  const currentBalance = 1046.5;
  const amount =
    selectedAmount || (customAmount ? parseFloat(customAmount) : 0);
  const newBalance = currentBalance + (amount || 0);

  const handleRecharge = () => {
    const value = amount;

    if (!value || value <= 0) {
      Alert.alert("Valor inválido", "Selecione um valor válido.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // aqui no web fazia localStorage.setItem("balance", ...)
      // depois, se quiser, a gente liga isso num contexto/AsyncStorage
      Alert.alert(
        "Recarga realizada",
        `Recarga de R$ ${value.toFixed(2)} realizada com sucesso!`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Home"),
          },
        ]
      );
    }, 1500);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCustomChange = (text) => {
    // permite só números e ponto
    const sanitized = text.replace(",", ".").replace(/[^0-9.]/g, "");
    setCustomAmount(sanitized);
    setSelectedAmount(null);
  };

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 32 }}
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
            <Text style={styles.headerTitle}>Recarga</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Preset Amounts */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Valores Rápidos</Text>

            <View style={styles.presetGrid}>
              {PRESET_AMOUNTS.map((preset) => {
                const isSelected = selectedAmount === preset;
                return (
                  <TouchableOpacity
                    key={preset}
                    style={[
                      styles.presetButton,
                      isSelected && styles.presetButtonSelected,
                    ]}
                    activeOpacity={0.85}
                    onPress={() => {
                      setSelectedAmount(preset);
                      setCustomAmount("");
                    }}
                  >
                    <Text
                      style={[
                        styles.presetButtonText,
                        isSelected && styles.presetButtonTextSelected,
                      ]}
                    >
                      R$ {preset}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Custom Amount */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Valor Personalizado</Text>

            <View style={styles.customAmountWrapper}>
              <Text style={styles.customAmountPrefix}>R$</Text>
              <TextInput
                style={styles.customInput}
                placeholder="0,00"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
                value={customAmount}
                onChangeText={handleCustomChange}
              />
            </View>
          </View>

          {/* Summary */}
          <View style={[styles.card, styles.summaryCard]}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Valor da Recarga</Text>
              <Text style={styles.summaryAmount}>
                R$ {amount.toFixed(2)}
              </Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Saldo Atual</Text>
              <Text style={styles.summaryValue}>
                R$ {currentBalance.toFixed(2)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Saldo após recarga</Text>
              <Text style={styles.summaryNewValue}>
                R$ {newBalance.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Recharge Button */}
          <TouchableOpacity
            style={[
              styles.primaryButton,
              (loading || amount <= 0) && styles.primaryButtonDisabled,
            ]}
            activeOpacity={0.85}
            onPress={handleRecharge}
            disabled={loading || amount <= 0}
          >
            {loading ? (
              <>
                <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.primaryButtonText}>Processando...</Text>
              </>
            ) : (
              <>
                <Feather
                  name="credit-card"
                  size={20}
                  color="#ffffff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.primaryButtonText}>Recarregar Agora</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Info */}
          <Text style={styles.infoText}>Transação segura e instantânea</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#020617", // bg-slate-900
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

  // Cards
  card: {
    backgroundColor: "#0f172a", // slate-800
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    marginBottom: 16,
  },
  cardTitle: {
    color: "#e5e7eb",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
  },

  // Presets
  presetGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  presetButton: {
    flexBasis: "30%",
    backgroundColor: "#334155",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  presetButtonSelected: {
    backgroundColor: "#ef4444",
    transform: [{ scale: 1.05 }],
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  presetButtonText: {
    color: "#e5e7eb",
    fontWeight: "600",
    fontSize: 14,
  },
  presetButtonTextSelected: {
    color: "#ffffff",
  },

  // Custom amount
  customAmountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2937",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#374151",
    paddingHorizontal: 14,
  },
  customAmountPrefix: {
    color: "#9ca3af",
    fontWeight: "600",
    marginRight: 6,
  },
  customInput: {
    flex: 1,
    color: "#f9fafb",
    paddingVertical: 10,
    fontSize: 14,
  },

  // Summary
  summaryCard: {
    backgroundColor: "#111827",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    color: "#9ca3af",
    fontSize: 13,
  },
  summaryAmount: {
    color: "#f87171",
    fontSize: 18,
    fontWeight: "700",
  },
  summaryValue: {
    color: "#f9fafb",
    fontSize: 16,
    fontWeight: "600",
  },
  summaryNewValue: {
    color: "#34d399",
    fontSize: 16,
    fontWeight: "700",
  },
  summaryDivider: {
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
    marginVertical: 10,
  },

  // Button
  primaryButton: {
    marginTop: 8,
    height: 48,
    borderRadius: 999,
    backgroundColor: "#ef4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },

  // Info text
  infoText: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 11,
    color: "#6b7280",
  },
});