import { View, Text } from "react-native";
import React from "react";

export default function RestaurantTagline() {
  return (
    <View>
      <View>
        <Text
          style={{
            color: "#00d4ff",
            textAlign: "center",
            fontSize: 17,
            paddingHorizontal: 10,
            lineHeight: 30,
            shadowColor: "aqua",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 6,
          }}
        >
          Feel the taste that you will never forget blended with tenderness
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 17,
            letterSpacing: 4,
            color: "#FFD700",
            marginTop: 15,
            fontWeight: "600",
          }}
        >
          ALL RESTAURANTS
        </Text>
      </View>
    </View>
  );
}
