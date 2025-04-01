import { View, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import Crousel from "../../components/Crousel";
import Restaurant from "@/components/Restaurant";
import LocationBar from "@/components/LocationBar";
import Search from "@/components/Search";
import RestaurantTagline from "@/components/RestaurantTagline";
import { RestaurantType } from "@/util/dataType";
import apiRequest from "@/services/apiRequest";

export default function Index() {
  const [currentAddress, setCurrentAddress] = useState("fetching location...");
  const [restaurant, setRestaurant] = useState<RestaurantType[]>();

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
    apiRequest.get("/restaurant").then((res) => {
      if (res?.status == 200) setRestaurant(res?.data?.data);
    });
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enable = await Location.hasServicesEnabledAsync();
    if (!enable) {
      Alert.alert(
        "Location is disabled",
        "Please enable your location to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location services",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const { latitude, longitude } = location.coords;

    let response = await LocationGeocoding.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (response.length > 0) {
      const { country, subregion, city } = response[0];
      let address = `${country}, ${city},  ${subregion}`;
      setCurrentAddress(address);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#1e1e2e" }}>
      <LocationBar currentAddress={currentAddress} />
      <Search />
      <Crousel />
      <RestaurantTagline />
      <View style={{ marginHorizontal: 8 }}>
        {restaurant?.map((item, index) => (
          <Restaurant key={index} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}
