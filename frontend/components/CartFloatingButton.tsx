// components/CartFloatingButton.tsx
import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { general_data } from "@/util/general_data";

const CartFloatingButton = ({ cart }: { cart: RootState["cart"]["cart"] }) => {
  const router = useRouter();

  if (cart?.length === 0) return null;

  return (
    <View style={styles.floatingButtonContainer}>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/cart",
            params: { name: "Your Cart" },
          })
        }
        style={styles.floatingButton}
      >
        <Text style={styles.floatingButtonTitle}>
          Click on it to see your cart
        </Text>
        <Text style={styles.floatingButtonText}>{cart.length} items added</Text>
        <Text style={styles.floatingButtonSubText}>
          Add items(s) worth 240 to reduce surge fee by {general_data.currency}{" "}
          35.
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    padding: 15,
    zIndex: 100,
  },
  floatingButton: {
    backgroundColor: "#FF6F61",
    paddingVertical: 15,
    borderRadius: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  floatingButtonTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  floatingButtonText: {
    color: "white",
    fontWeight: "400",
    fontSize: 14,
  },
  floatingButtonSubText: {
    color: "white",
    fontSize: 12,
  },
});

export default CartFloatingButton;
