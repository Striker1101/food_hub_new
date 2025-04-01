// components/MenuButton.tsx
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MenuButton = ({ setModalVisible, cart }: { setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; cart: any }) => {
  return (
    <Pressable
      onPress={() => setModalVisible((prev) => !prev)}
      style={[styles.menuButton, cart?.length > 0 ? styles.cartActive : styles.cartInactive]}
    >
      <Ionicons style={styles.menuIcon} name="fast-food" size={28} color="white" />
      <Text style={styles.menuText}>MENU</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    bottom: 80,
    backgroundColor: "#FF6F61",
    shadowColor: "#FF6F61",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  cartActive: {
    bottom: 140,
  },
  cartInactive: {
    bottom: 30,
  },
  menuIcon: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
  },
  menuText: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 5,
  },
});

export default MenuButton;
