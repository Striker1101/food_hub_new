import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ProductType, RestaurantType } from "@/util/dataType";
import { defaultProduct } from "@/util/defaultData";
import apiRequest from "@/services/apiRequest";
import { showToast } from "@/util/helperFunction";

type Props = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  product: ProductType | null;
  restaurant: RestaurantType;
  setReloadMenu: any;
  clearProduct: boolean;
};

function MenuForm({
  modalVisible,
  setModalVisible,
  product,
  setReloadMenu,
  restaurant,
  clearProduct,
}: Props) {
  const [formData, setFormData] = useState<ProductType>(
    product || defaultProduct
  );
  const [selectedImage, setSelectedImage] = useState<string>(
    String(formData?.image)
  );

  const handleFormChange = (field: keyof ProductType, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    console.log("status", status);
    if (status !== "granted") {
      showToast(
        "error",
        "Permission Denied",
        "Allow access to photos to continue."
      );
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // If user picks an image, update state
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  useEffect(() => {
    setFormData(defaultProduct);
  }, [clearProduct]);

  const onSubmit = () => {
    console.log("formData", formData);

    if (product) {
      apiRequest
        .put(`/product/${product?.id}`, {
          ...formData,
          restaurantId: restaurant?.id,
        })
        .then((res) => {
          console.log("update response", res);
          if (res?.status == 200) {
            showToast(
              "success",
              res.data?.msg ||
                res.data?.message ||
                "Product Updated Successful!"
            );
            setModalVisible(false);
            setReloadMenu((prev: boolean) => !prev);
          }
        })
        .catch((error) => {
          console.error("Error updating restaurant:", error);
          showToast("error", "Failed to update restaurant");
        });
    } else {
      apiRequest
        .post(`/product`, {
          ...formData,
          restaurantId: restaurant?.id,
        })
        .then((res) => {
          console.log("update response", res);
          if (res?.status == 200) {
            showToast(
              "success",
              res.data?.msg ||
                res.data?.message ||
                "Product Created3 Successful!"
            );
            setModalVisible(false);
            setReloadMenu((prev: boolean) => !prev);
          }
        })
        .catch((error) => {
          console.error("Error updating restaurant:", error);
          showToast("error", "Failed to update restaurant");
        });
    }
  };
  return (
    <Modal visible={modalVisible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Product Name"
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleFormChange("name", text)}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={formData.description}
            onChangeText={(text) => handleFormChange("description", text)}
          />
          <TextInput
            placeholder="Price"
            style={styles.input}
            value={String(formData.price)}
            keyboardType="numeric"
            onChangeText={(text) =>
              handleFormChange("price", parseFloat(text) || 0)
            }
          />
          <TextInput
            placeholder="Stock"
            style={styles.input}
            value={String(formData.stock)}
            keyboardType="numeric"
            onChangeText={(text) =>
              handleFormChange("stock", parseInt(text) || 0)
            }
          />
          <TextInput
            placeholder="Category"
            style={styles.input}
            value={formData.category}
            onChangeText={(text) => handleFormChange("category", text)}
          />
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {formData.image ? (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            ) : (
              ""
            )}
            <Button title="Pick an image" onPress={pickImage} />
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={() => setModalVisible(false)} />
            <Button title={product ? "Update" : "Save"} onPress={onSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default MenuForm;
