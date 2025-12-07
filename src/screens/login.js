import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ensureUserDocument } from "../services/userService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  const handleLogin = async () => {
  setError("");
  setLoading(true);

  if (!email || !password) {
    setError("Por favor, preencha todos os campos");
    setLoading(false);
    return;
  }

  if (!validateEmail(email)) {
    setError("Email inválido");
    setLoading(false);
    return;
  }

  if (password.length < 6) {
    setError("Senha deve ter no mínimo 6 caracteres");
    setLoading(false);
    return;
  }

  try {
    // Login REAL no Firebase
    const cred = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuário logado:", cred.user.uid);

    // Garante que o documento do usuário exista com saldo
    const profile = await ensureUserDocument(cred.user);
    console.log("Perfil carregado/criado:", profile);

    // Vai pra Home
    navigation.replace("Home");
  } catch (err) {
    console.log("Erro no login:", err.code, err.message);

    if (err.code === "auth/user-not-found") {
      setError("Usuário não encontrado");
    } else if (
      err.code === "auth/wrong-password" ||
      err.code === "auth/invalid-credential"
    ) {
      setError("Email ou senha incorretos");
    } else if (err.code === "auth/too-many-requests") {
      setError("Muitas tentativas. Tente novamente mais tarde.");
    } else {
      setError("Erro ao entrar. Tente novamente.");
    }
  } finally {
    setLoading(false);
  }
};

  const handleFillDemo = () => {
    // já preenche com o usuário que você criou no Firebase
    setEmail("admin@gmail.com");
    setPassword("123456");
  };

  return (
    <View style={styles.loginRoot}>
      <StatusBar barStyle="light-content" />

      <View style={styles.loginWrapper}>
        <View style={styles.loginCard}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>💳</Text>
            </View>
          </View>

          <Text style={styles.loginTitle}>Carteira Digital</Text>
          <Text style={styles.loginSubtitle}>Acesse sua conta</Text>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor="#6b7280"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Senha */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Senha</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="••••••••"
                placeholderTextColor="#6b7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword((prev) => !prev)}
                activeOpacity={0.7}
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={18}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botão Entrar */}
          <TouchableOpacity
            style={[
              styles.primaryButton,
              loading && styles.primaryButtonDisabled,
            ]}
            activeOpacity={0.8}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.primaryButtonText}>Entrando...</Text>
              </>
            ) : (
              <Text style={styles.primaryButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          {/* Demo */}
          <View style={styles.demoSection}>
            <Text style={styles.demoText}>
              Demo: Use o usuário de teste cadastrado no Firebase
            </Text>

            <TouchableOpacity
              style={styles.outlineButton}
              activeOpacity={0.8}
              onPress={handleFillDemo}
            >
              <Text style={styles.outlineButtonText}>Preencher Demo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

// (styles exatamente como você já tinha)
const styles = StyleSheet.create({
  loginRoot: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  loginWrapper: {
    width: "100%",
    maxWidth: 400,
  },
  loginCard: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#1f2937",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 28,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f9fafb",
    textAlign: "center",
    marginBottom: 4,
  },
  loginSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 24,
  },
  errorBox: {
    backgroundColor: "rgba(248, 113, 113, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.5)",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#fca5a5",
    fontSize: 13,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#e5e7eb",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#1f2937",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#f9fafb",
    borderWidth: 1,
    borderColor: "#374151",
    fontSize: 14,
  },
  passwordWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    height: "100%",
    justifyContent: "center",
  },
  primaryButton: {
    marginTop: 18,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  primaryButtonDisabled: {
    opacity: 0.8,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  demoSection: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
  },
  demoText: {
    fontSize: 11,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 12,
  },
  outlineButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#4b5563",
    paddingVertical: 10,
    alignItems: "center",
  },
  outlineButtonText: {
    color: "#e5e7eb",
    fontSize: 14,
    fontWeight: "500",
  },
});
