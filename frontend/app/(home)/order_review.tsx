import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import apiRequest from "@/services/apiRequest";
import { getUser } from "@/util/helperFunction";
import Toast from "react-native-toast-message";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
// Define pastel colors
const PASTEL_COLORS = [
  "#FDF6E3",
  "#E0F7FA",
  "#F3E5F5",
  "#FFF3E0",
  "#E8F5E9",
  "#E1F5FE",
];

const STATUS_COLORS: Record<string, string> = {
  pending: "#F59E0B",
  processing: "#3B82F6",
  delivered: "#10B981",
  cancelled: "#EF4444",
};

function getRandomColor(index: number) {
  return PASTEL_COLORS[index % PASTEL_COLORS.length];
}

export default function OrderReview() {
  const [orders, setOrders] = useState<any[]>([]);
  const navigation = useNavigation();
  async function getOrders() {
    const user = await getUser();
    apiRequest
      .get(`/order_item/restaurant/${user?.id}`)
      .then((res) => setOrders(res?.data || []))
      .catch(console.log);
  }

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: "Message",
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  const router = useRouter();
  return (
    <ScrollView className="bg-[#f9fafb] p-4">
      {/* <Text className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        Orders
      </Text> */}
      {orders.length === 0 ? (
        <Text className="text-center text-gray-500 mt-20">No orders yet.</Text>
      ) : (
        <View className="space-y-6">
          <View style={styles.header}>
            <Ionicons
              onPress={() => router.back()}
              name="arrow-back"
              size={24}
              color="white"
            />
          </View>
          {orders.map((order, index) => (
            <OrderCard
              key={order.id}
              order={order}
              index={index}
              refresh={getOrders}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

function OrderCard({
  order,
  refresh,
  index,
}: {
  order: any;
  refresh: () => void;
  index: number;
}) {
  const [status, setStatus] = useState(order.status);
  const bgColor = getRandomColor(index);
  const statusColor = STATUS_COLORS[status] || "#6B7280";

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    apiRequest
      .put(`/order_item/${order.id}/status`, { status: newStatus })
      .then(() => {
        Toast.show({ type: "success", text1: "Status updated!" });
        refresh();
      })
      .catch(() =>
        Toast.show({ type: "error", text1: "Failed to update status" })
      );
  };
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      className="rounded-2xl shadow-md"
      style={{
        backgroundColor: bgColor,
        minHeight: 220,
        padding: 16,
      }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 pr-4">
          <Text className="text-xl font-bold text-gray-800 mb-1">
            Order #{order.id}
          </Text>
          <Text className="text-sm text-gray-600">
            {new Date(order.createdAt).toLocaleString()}
          </Text>
        </View>
        <View
          className="px-2 py-1 rounded-full"
          style={{
            backgroundColor: statusColor,
            opacity: 0.2,
          }}
        >
          <Text
            className="text-xs font-semibold uppercase"
            style={{ color: statusColor }}
          >
            {status}
          </Text>
        </View>
      </View>

      {/* Customer Info */}
      <View className="mb-2">
        <Text className="text-base text-gray-700">
          <Text className="font-semibold">Customer:</Text>{" "}
          {order.customer?.name}
        </Text>
        <Text className="text-sm text-gray-500">{order.customer?.email}</Text>
        <Text className="text-sm text-gray-500 mt-1">
          Payment: {order.PaymentMethod?.name}
        </Text>
      </View>

      {/* Products */}
      <FlatList
        data={order.products}
        horizontal
        keyExtractor={(p) => p.id.toString()}
        showsHorizontalScrollIndicator={false}
        className="mb-4"
        renderItem={({ item }) => (
          <View className="mr-4 w-24">
            <Image
              source={{ uri: item.image }}
              className="w-24 h-24 rounded-xl border border-gray-300 mb-1"
              style={{ resizeMode: "cover" }}
            />
            <Text className="text-xs font-medium text-gray-700">
              {item.name.length > 12 ? item.name.slice(0, 11) + "…" : item.name}
            </Text>
            <Text className="text-xs text-gray-600">x{item.quantity}</Text>
          </View>
        )}
      />

      {/* Footer */}
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold text-gray-800">
          ₦{order.price.toLocaleString()}
        </Text>
        <View
          className="rounded-lg border"
          style={{
            borderColor: statusColor,
            overflow: "hidden",
          }}
        >
          <Picker
            selectedValue={status}
            onValueChange={handleStatusChange}
            style={{
              height: 44,
              width: 150,
              color: statusColor,
              fontWeight: "bold",
            }}
            mode="dropdown"
          >
            <Picker.Item label="Pending" value="pending" />
            <Picker.Item label="Processing" value="processing" />
            <Picker.Item label="Delivered" value="delivered" />
            <Picker.Item label="Cancelled" value="cancelled" />
          </Picker>
        </View>
        <Toast />
      </View>
    </TouchableOpacity>
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
});
