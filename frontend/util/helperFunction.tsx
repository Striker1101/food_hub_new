import { Alert, PermissionsAndroid, Platform } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiRequest from "@/services/apiRequest";
import { UserType } from "./dataType";

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (err) {
    console.error("Error getting token:", err);
    return null;
  }
};

export const getUser = async (): Promise<UserType | null> => {
  try {
    const user = await AsyncStorage.getItem("authUser");
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.error("Error getting user:", err);
    return null;
  }
};

export const showToast = (
  type: "success" | "error" | "info",
  title: string,
  message?: string
) => {
  Toast.show({
    type,
    text1: title || "Error, PLease try again",
    text2: message,
  });
};
