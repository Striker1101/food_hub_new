import React, { useEffect, useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import apiRequest from "@/services/apiRequest";
import { ProductType, RestaurantType } from "@/util/dataType";
import { getUser } from "@/util/helperFunction";
import RestaurantForm from "@/components/Forms/RestaurantForm";
import { defaultRestaurant } from "@/util/defaultData";
import { useNavigation, useRouter } from "expo-router";
import MenuForm from "@/components/Forms/ProductForm";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

export default function AdminRestaurant() {
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Restaurant Profile",
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  useEffect(() => {
    async function fetchRestaurant() {
      const user = await getUser();
      if (user?.id) {
        apiRequest
          .get(`/restaurant/by_user_id/${user.id}`)
          .then((res) => {
            if (res?.data) setRestaurant(res?.data[0]);
          })
          .catch((err) => console.error("API Error:", err.response?.data));
      }
    }
    fetchRestaurant();
  }, []);

  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          onPress={() => router.back()}
          name="arrow-back"
          size={24}
          color="white"
        />
      </View>

      <View style={styles.card}>
        {restaurant?.featuredImage && (
          <Image
            source={{ uri: restaurant.featuredImage }}
            style={styles.image}
          />
        )}
        <Text style={styles.title}>{restaurant?.name}</Text>
        <Text style={styles.text}>{restaurant?.address}</Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Edit Restaurant Details</Text>
        </Pressable>
      </View>
      <MenuCard restaurant={restaurant} />
      <RestaurantForm
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        restaurant={restaurant || defaultRestaurant}
      />
      <Toast />
    </ScrollView>
  );
}

function MenuCard({ restaurant }: { restaurant: RestaurantType | null }) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [clearProduct, setClearProduct] = useState(false);
  const [editData, setEditData] = useState<ProductType | null>(null);
  const [reloadMenu, setReloadMenu] = useState(false);
  useEffect(() => {
    async function fetchProduct() {
      // if (restaurant?.id) {
      apiRequest
        .get(`/product/by_restaurant_non_group/${restaurant?.id}`)
        .then((res) => {
          if (res?.status == 200) setProducts(res?.data);
        })
        .catch((err) => console.error("API Error:", err.response?.data));
    }
    // }
    fetchProduct();
  }, [reloadMenu, restaurant]);
  return (
    <View style={styles.card}>
      <Pressable
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
          setClearProduct(!clearProduct);
        }}
      >
        <Text style={styles.buttonText}>Add Product to Menu</Text>
      </Pressable>
      {products.map((product) => (
        <View
          key={product.id}
          style={[
            styles.productItem,
            product.image
              ? { backgroundImage: `url(${product.image})` }
              : styles.fallbackBg,
          ]}
        >
          {!product.image && <Text style={styles.noImageText}>No Image</Text>}
          <View style={styles.overlay}>
            <Text style={styles.text}>{product.name}</Text>
            <Text style={styles.price}>
              ${(parseInt(String(product?.price)) || 0).toFixed(2)}
            </Text>
            <View style={styles.buttonContainer}>
              <Pressable
                onPress={() => {
                  // console.log("product", product);
                  setEditData(product);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ))}
      <MenuForm
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        product={editData}
        restaurant={restaurant || defaultRestaurant}
        setReloadMenu={setReloadMenu}
        clearProduct={clearProduct}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#1e1e2e", // Updated background color
    elevation: 5,
  },
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: "#f4f4f4",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonSmall: {
    backgroundColor: "#28a745",
    padding: 6,
    borderRadius: 5,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageSmall: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  productItem: {
    height: 150,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  fallbackBg: {
    backgroundColor: "#f0f0f0",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 3,
  },
  price: {
    fontSize: 16,
    color: "#FFD700",
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#ff6347",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    marginBottom: 5,
    fontWeight: "bold",
  },
  noImageText: {
    color: "#777",
    fontSize: 16,
  },
});
