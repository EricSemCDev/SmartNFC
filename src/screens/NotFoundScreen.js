import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function NotFoundScreen({ navigation }) {
  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        {/* Ícone */}
        <View style={styles.iconWrapper}>
          <View style={styles.iconPulse} />
          <Feather name="alert-circle" size={42} color="#ef4444" />
        </View>

        <Text style={styles.code}>404</Text>
        <Text style={styles.title}>Page Not Found</Text>

        <Text style={styles.message}>
          Sorry, the page you are looking for doesn't exist.{"\n"}
          It may have been moved or deleted.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={handleGoHome}
        >
          <Feather
            name="home"
            size={18}
            color="#ffffff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#e5e7eb", // cinza clarinho
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    alignItems: "center",
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    overflow: "visible",
  },
  iconPulse: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fee2e2",
    opacity: 0.6,
  },
  code: {
    fontSize: 36,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  message: {
    fontSize: 13,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 18,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    shadowColor: "#2563eb",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
});
