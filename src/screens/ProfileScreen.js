import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  // Por enquanto, simulando o usuário e saldo
  // (depois, se quiser, a gente liga isso com AsyncStorage ou Context)
  const user = {
    name: "Eric",
    email: "demo@example.com",
  };
  const balance = 1046.5;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogout = () => {
    // No web: removia do localStorage e ia pra /login
    // Aqui vamos só resetar a navegação pro Login
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
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
            <Text style={styles.headerTitle}>Perfil</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileAvatar}>
              <Feather name="user" size={36} color="#ffffff" />
            </View>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>

          {/* Info Sections */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Informações da Conta</Text>

            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>

            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Saldo Disponível</Text>
              <Text style={styles.infoValue}>
                R$ {balance.toFixed(2)}
              </Text>
            </View>

            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Status da Conta</Text>
              <Text style={styles.infoStatus}>✓ Verificada</Text>
            </View>
          </View>

          {/* Settings */}
          <View style={styles.settingsCard}>
            <Text style={styles.infoTitle}>Configurações</Text>

            <TouchableOpacity
              style={styles.settingButton}
              activeOpacity={0.8}
            >
              <Text style={styles.settingText}>Alterar Senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingButton}
              activeOpacity={0.8}
            >
              <Text style={styles.settingText}>Notificações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingButton}
              activeOpacity={0.8}
            >
              <Text style={styles.settingText}>Privacidade</Text>
            </TouchableOpacity>
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.85}
            onPress={handleLogout}
          >
            <Feather
              name="log-out"
              size={18}
              color="#fca5a5"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
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

  // Profile
  profileCard: {
    backgroundColor: "#1f2937",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#4b5563",
    alignItems: "center",
    marginBottom: 16,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  profileName: {
    color: "#f9fafb",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  profileEmail: {
    color: "#9ca3af",
    fontSize: 13,
  },

  // Info
  infoCard: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    marginBottom: 16,
  },
  infoTitle: {
    color: "#e5e7eb",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
  },
  infoGroup: {
    marginBottom: 10,
  },
  infoLabel: {
    color: "#6b7280",
    fontSize: 11,
    marginBottom: 2,
  },
  infoValue: {
    color: "#f9fafb",
    fontSize: 14,
    fontWeight: "500",
  },
  infoStatus: {
    color: "#4ade80",
    fontSize: 14,
    fontWeight: "600",
  },

  // Settings
  settingsCard: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    marginBottom: 16,
  },
  settingButton: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#1f2937",
    marginBottom: 8,
  },
  settingText: {
    color: "#e5e7eb",
    fontSize: 14,
    fontWeight: "500",
  },

  // Logout
  logoutButton: {
    marginTop: 4,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(248,113,113,0.5)",
    backgroundColor: "rgba(248,113,113,0.15)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: "#fca5a5",
    fontSize: 14,
    fontWeight: "600",
  },
});
