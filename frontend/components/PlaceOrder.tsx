import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert, Modal } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { cleanCart } from "../redux/CartReducer";
import { general_data } from "@/util/general_data";
import {
  CartItem,
  Instruction,
  RestaurantType,
  UserType,
} from "@/util/dataType";
import { getUser, showToast } from "@/util/helperFunction";
import apiRequest from "@/services/apiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OrderFooterProps {
  total: number;
  name: string | string[];
  cart: CartItem[];
}

const PlaceOrder: React.FC<OrderFooterProps> = ({ total, name, cart }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const cartDetail = cart.map((item) => ({
    id: item?.id,
    quantity: item?.quantity,
  }));

  useEffect(() => {
    async function getUserData() {
      const _user = await getUser();
      setUser(_user);
    }
    getUserData();
  }, []);

  useEffect(() => {
    async function fetchRestaurant() {
      const user = await getUser();
      const restaurantID = await AsyncStorage.getItem("restaurantID");
      if (user?.id) {
        apiRequest
          .get(`/restaurant/${JSON.parse(restaurantID as string)}`)
          .then((res) => {
            if (res?.data) setRestaurant(res?.data?.restaurant);
          })
          .catch((err) => console.error("API Error:", err.response?.data));
      }
    }
    fetchRestaurant();
  }, [restaurant]);

  const handleOrder = () => {
    apiRequest
      .post("/order_item", {
        userId: user?.id,
        products: JSON.stringify(cartDetail),
        price: total,
        paymentMethodId: 24,
      })
      .then(() => {
        showToast(
          "success",
          "Order was Successful",
          "Pick Up at the counter in 10-25min"
        );
        dispatch(cleanCart());
        setTimeout(() => {
          router.replace({
            pathname: "/",
            params: { name },
          });
        }, 4000);
      });
    setModalVisible(false);
    return;

    // Show the modal with restaurant account details for payment
  };

  const details = restaurant?.details
    ? JSON.parse(restaurant.details as string)
    : {};

  return (
    total > 0 && (
      <View style={styles.footer}>
        <View>
          {/* <Text style={styles.footerText}>Pay Using {selected?.name}</Text>*/}
          <Text style={styles.footerSubText}>service charge = 10</Text>
        </View>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.placeOrderButton}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View>
              <Text style={styles.orderAmount}>
                {general_data.symbol}
                {Math.floor(total + 10)}
              </Text>
              <Text style={styles.orderTotal}>TOTAL</Text>
            </View>
            <Text style={styles.placeOrderText}>Place Order</Text>
          </View>
        </Pressable>

        {/* Payment Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Restaurant Account Details</Text>
              <Text style={styles.modalText}>
                Bank: {details?.bank_name || "XYZ Bank"}
              </Text>
              <Text style={styles.modalText}>
                Account Number: {details?.bank_number || "1234567890"}
              </Text>
              <Text style={styles.modalText}>
                Name: {details?.account_name || " ABC Restaurant"}
              </Text>

              <Pressable onPress={handleOrder} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>I've Paid</Text>
              </Pressable>

              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    )
  );
};

const styles = StyleSheet.create({
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PlaceOrder;
