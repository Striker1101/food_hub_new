import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { BankAccount, RestaurantType } from "@/util/dataType";
import apiRequest from "@/services/apiRequest";
import { defaultRestaurant } from "@/util/defaultData";
import { showToast } from "@/util/helperFunction";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

type Props = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  restaurant: RestaurantType;
};

function RestaurantForm({ modalVisible, setModalVisible, restaurant }: Props) {
  const [formData, setFormData] = useState<RestaurantType>(defaultRestaurant);

  useEffect(() => {
    if (restaurant) {
      setFormData((prev) => ({
        ...prev,
        ...restaurant,
        details: restaurant.details || {
          bank_number: "",
          bank_name: "",
          account_name: "",
        },
      }));
    }
  }, [restaurant]);

  const handleFormChange = (field: string, value: string) => {
    if (["bank_name", "account_name", "bank_number"].includes(field)) {
      // If field belongs to 'details'
      setFormData((prev) => ({
        ...prev,
        details: {
          bank_number:
            prev.details && typeof prev.details === "object"
              ? prev.details.bank_number ?? null
              : null,
          bank_name:
            prev.details && typeof prev.details === "object"
              ? prev.details.bank_name ?? null
              : null,
          account_name:
            prev.details && typeof prev.details === "object"
              ? prev.details.account_name ?? null
              : null,
          [field]: value, // Update the specific field
        } as BankAccount, // Ensure it's correctly typed
      }));
    } else {
      // Normal field update
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  }; 

  const onSubmit = () => {
    if (!restaurant?.id) return;
    console.log("formData", formData);
    apiRequest
      .put(`/restaurant/${restaurant.id}`, formData)
      .then((res) => {
        console.log("update response", res);
        if (res?.status == 200) {
          showToast(
            "success",
            res.data?.msg || "Restaurant updated successfully!"
          );
          setModalVisible(false);
        }
      })
      .catch((error) => {
        console.error("Error updating restaurant:", error);
        showToast("error", "Failed to update restaurant");
      });
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleFormChange("image", result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Restaurant Name"
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
              placeholder="Address"
              style={styles.input}
              value={formData.address}
              onChangeText={(text) => handleFormChange("address", text)}
            />
            <TextInput
              placeholder="City"
              style={styles.input}
              value={formData.city}
              onChangeText={(text) => handleFormChange("city", text)}
            />
            <TextInput
              placeholder="State"
              style={styles.input}
              value={formData.state}
              onChangeText={(text) => handleFormChange("state", text)}
            />
            <TextInput
              placeholder="Zip Code"
              style={styles.input}
              value={formData.zipCode}
              onChangeText={(text) => handleFormChange("zipCode", text)}
            />
            <TextInput
              placeholder="Phone"
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => handleFormChange("phone", text)}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => handleFormChange("email", text)}
            />
            <TextInput
              placeholder="Website"
              style={styles.input}
              value={formData.website}
              onChangeText={(text) => handleFormChange("website", text)}
            />
            <TextInput
              placeholder="Rating"
              style={styles.input}
              value={formData.rating.toString()}
              onChangeText={(text) => handleFormChange("rating", text)}
            />
            <TextInput
              placeholder="Minimum Order"
              style={styles.input}
              value={formData.minimumOrder.toString()}
              onChangeText={(text) => handleFormChange("minimumOrder", text)}
            />
            <TextInput
              placeholder="Delivery Time"
              style={styles.input}
              value={formData.deliveryTime}
              onChangeText={(text) => handleFormChange("deliveryTime", text)}
            />
            <TextInput
              placeholder="Bank Name"
              style={styles.input}
              value={
                typeof formData.details == "string"
                  ? JSON.parse(formData.details)?.bank_name
                  : formData.details.bank_name
              }
              onChangeText={(text) => handleFormChange("bank_name", text)}
            />
            <TextInput
              placeholder="Bank Number"
              style={styles.input}
              value={
                typeof formData.details === "string"
                  ? JSON.parse(formData.details)?.bank_number
                  : formData.details.bank_number
              }
              onChangeText={(text) => handleFormChange("bank_number", text)}
            />
            <TextInput
              placeholder="Account Name"
              style={styles.input}
              value={
                typeof formData.details == "string"
                  ? JSON.parse(formData.details)?.account_name
                  : formData.details.account_name
              }
              onChangeText={(text) => handleFormChange("account_name", text)}
            />
            {/* <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {formData.featuredImage ? (
                <Image
                  source={{ uri: formData.featuredImage }}
                  style={styles.image}
                />
              ) : (
                <Button title="Pick an image" onPress={pickImage} />
              )}
            </TouchableOpacity> */}
            <TextInput
              placeholder="Featured Image"
              style={styles.input}
              value={formData.featuredImage}
              onChangeText={(text) => handleFormChange("featuredImage", text)}
            />
            <View style={styles.buttonContainer}>
              <Button title="Close" onPress={() => setModalVisible(false)} />
              <Button title="Save" onPress={onSubmit} />
            </View>
          </View>
          <Toast />
        </View>
      </Modal>
    </ScrollView>
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

export default RestaurantForm;
