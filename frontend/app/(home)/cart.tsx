import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import FoodItem from "@/components/FoodItem";
import CartItem from "@/components/CartItem";
import DeliverInstructions from "@/components/DeliverInstructions";
import BillingSummary from "@/components/BillingSummary";
import PlaceOrder from "@/components/PlaceOrder";
import { GroupedProducts, Instruction } from "@/util/dataType";
import apiRequest from "@/services/apiRequest";
import Toast from "react-native-toast-message";

export default function Cart() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const [products, setProducts] = useState<GroupedProducts[]>();
  const [id, setID] = useState<string | null>();

  const instructions: Instruction[] = [
    { id: "0", name: "Online", iconName: "bell", desc: "Pay using Gateways" },
    {
      id: "1",
      name: "on Deliver",
      iconName: "door-open",
      desc: "Pay on Casher",
    },
  ];

  const total = cart
    ?.map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const toggleInstruction = (id: string) => {
    setID(id);
  };

  useEffect(() => {
    apiRequest.get("/product").then((res) => {
      if (res?.status == 200) setProducts(res.data);
    });
  }, []);

  return (
    <>
      <ScrollView>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Ionicons
              onPress={() => router.back()}
              name="arrow-back"
              size={24}
              color="white"
            />
            <Text style={styles.headerText}>{params?.name}</Text>
          </View>

          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryText}>
              {" "}
              Delivery in{" "}
              <Text style={styles.deliveryHighlight}>35 - 40 mins</Text>
            </Text>
          </View>

          <Text style={styles.sectionTitle}>ITEM(S) ADDED</Text>

          {cart?.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}

          <Text style={styles.sectionTitle}>Delivery Instructions</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.instructionsContainer}
          >
            {instructions.map((item) => (
              <DeliverInstructions
                key={item.id}
                id={item.id}
                name={item.name}
                iconName={item.iconName}
                isSelected={id === item.id}
                toggleInstruction={toggleInstruction}
              />
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Billing Details</Text>
          <BillingSummary total={total} selected={instructions[Number(id)]} />
        </ScrollView>

        <PlaceOrder
          total={total}
          name={params?.name}
          cart={cart}
          selected={instructions[Number(id)]}
        />

        <View style={{ backgroundColor: "#1e1e2e" }}>
          <View style={{ paddingBottom: 100 }}>
            {products?.map((item, index) =>
              item.name === "Fries" || item.name === "Drinks" ? (
                <FoodItem key={index} item={item} />
              ) : null
            )}
          </View>
        </View>
        <Toast />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2e",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 8,
    fontWeight: "bold",
    color: "white",
  },
  deliveryInfo: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    margin: 10,
    padding: 12,
    borderRadius: 10,
  },
  deliveryText: {
    fontSize: 14,
    color: "#ffffffb3",
  },
  deliveryHighlight: {
    fontWeight: "600",
    color: "#fd5c63",
  },
  sectionTitle: {
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
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
  instructionsContainer: {
    flexDirection: "row",
    margin: 10,
  },
  instruction: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  instructionSelected: {
    backgroundColor: "#fd5c63",
  },
  instructionText: {
    marginTop: 5,
    fontSize: 12,
    color: "white",
  },
  billingContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    margin: 10,
    borderRadius: 15,
    padding: 10,
  },
  billingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  billingLabel: {
    fontSize: 14,
    color: "#ffffffb3",
  },
  billingValue: {
    fontSize: 14,
    color: "#00d4ff",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
    paddingTop: 10,
    marginTop: 10,
  },
  billingTotalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  billingTotalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fd5c63",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  footerSubText: {
    fontSize: 12,
    color: "#ffffffb3",
  },
  placeOrderButton: {
    backgroundColor: "#fd5c63",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 15,
    minWidth: 150,
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  orderTotal: {
    fontSize: 12,
    color: "#ffffffb3",
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
