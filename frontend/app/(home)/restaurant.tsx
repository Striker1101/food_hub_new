import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FoodItem from "@/components/FoodItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import RestaurantInfo from "@/components/RestaurantInfo";
import CartFloatingButton from "@/components/CartFloatingButton";
import ModalMenu from "@/components/ModalMenu";
import MenuButton from "@/components/MenuButton";
import apiRequest from "@/services/apiRequest";

const Restaurant = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiRequest.get(`/product/by_restaurant/${params?.id}`).then((res) => {
      if (res?.status == 200) setProducts(res.data);
    });
  }, []);

  return (
    <>
      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons
            onPress={() => router.back()}
            name="arrow-back"
            size={24}
            color="white"
            style={styles.backIcon}
          />
          <Text style={styles.headerTitle}>{params?.name || "Restaurant"}</Text>
          <Text> </Text>
        </View>

        {/* Restaurant Info Section */}
        <RestaurantInfo
          name={params?.name}
          address={params.address}
          rating={params.rating}
          deliver_time={params.deliver_time}
          city={params.city}
          state={params.state}
          phone={params.phone}
          website={params.website}
          min_order={params.min_order}
        />
        {/* Render Food Items */}
        <View style={{ paddingBottom: 100 }}>
          {products?.map((item, index) => (
            <FoodItem key={index} item={item} />
          ))}
        </View>
      </ScrollView>
      <MenuButton setModalVisible={setModalVisible} cart={cart} />
      <ModalMenu
        products={products}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <CartFloatingButton cart={cart} />
    </>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#1e1e2e", // Updated background color
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#1e1e2e", // Updated background color
    elevation: 5,
  },
  backIcon: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // Updated text color for better contrast
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  categoryScroll: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },
  categoryButton: {
    backgroundColor: "#3b3b3b", // Slightly darker background
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#444", // Updated border color
    alignItems: "center",
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    color: "#fff", // Updated text color for better contrast
    fontWeight: "500",
  },
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
  modalContainer: {
    backgroundColor: "#333", // Dark background for modal
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    gap: 20,
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  modalItemText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff", // Adjusted text color for readability
  },
  modalItemCount: {
    fontSize: 14,
    fontWeight: "400",
    color: "#fff", // Adjusted color for contrast
  },
  modalLogoContainer: {
    alignItems: "center",
  },
  modalLogo: {
    width: 80,
    height: 80,
  },
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
