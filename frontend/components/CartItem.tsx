// CartItem.tsx
import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity } from "../redux/CartReducer";

interface CartItemProps {
  item: {
    id?: number;
    name: string;
    price: number;
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Pressable style={styles.cartItem}>
      <View style={styles.itemRow}>
        <Text style={styles.itemName}>{item?.name}</Text>
        <View style={styles.quantityControl}>
          <Pressable onPress={() => dispatch(decrementQuantity(item))}>
            <Text style={styles.quantityButton}>-</Text>
          </Pressable>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Pressable onPress={() => dispatch(incrementQuantity(item))}>
            <Text style={styles.quantityButton}>+</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemPrice}>NGN {item.price * item.quantity}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item?.quantity}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    margin: 10,
    padding: 12,
    borderRadius: 15,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00d4ff",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#ffffffb3",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fd5c63",
    paddingHorizontal: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginHorizontal: 8,
  },
});

export default CartItem;
