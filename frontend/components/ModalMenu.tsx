// components/ModalMenu.tsx
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import menu from "../data/menu.json";
import Modal from "react-native-modal";
import { GroupedProducts } from "@/util/dataType";

const ModalMenu = ({
  modalVisible,
  setModalVisible,
  products,
}: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  products: GroupedProducts[];
}) => {
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        {products?.map((item, index) => (
          <View key={index} style={styles.modalItem}>
            <Text style={styles.modalItemText}>{item.name}</Text>
            <Text style={styles.modalItemCount}>{item.items?.length}</Text>
          </View>
        ))}
        <View style={styles.modalLogoContainer}>
          <Image
            style={styles.modalLogo}
            source={{
              uri: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_284/Logo_f5xzza",
            }}
          />
        </View>
        {products.length <= 0 && (
          <Text style={styles.modalItemText}>No Menu Available</Text>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#333",
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
    color: "#fff",
  },
  modalItemCount: {
    fontSize: 14,
    fontWeight: "400",
    color: "#fff",
  },
  modalLogoContainer: {
    alignItems: "center",
  },
  modalLogo: {
    width: 80,
    height: 80,
  },
});

export default ModalMenu;
