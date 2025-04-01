import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

// Get screen width dynamically for responsive design
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Sample image URLs
const images: string[] = [
  "https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1460306855393-0410f61241c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVyZ2VyfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVyZ2VyfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1515467705959-1142c6a92b19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZyaWVzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJpZXN8ZW58MHx8MHx8fDA%3D"
];

const ImageCarousel = () => {
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        width={screenWidth}
        height={screenHeight * 0.25} // Dynamic height (40% of screen height)
        data={images}
        renderItem={({ item }: { item: string }) => (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
        autoPlay
        autoPlayInterval={3000} // Change the interval to 3 seconds
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginVertical: 17,
    backgroundColor: '#1e1e2e ', // Ensures a white background to avoid visual issues
    borderRadius: 10, // Smooth rounded edges
    elevation: 5, // Shadow for better visibility on Android
    overflow: 'hidden', // Keeps the content inside the rounded corners
  },
  imageContainer: {
    flex: 1, // Ensures the image takes up all available space
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    paddingHorizontal:10,
    width: screenWidth,
    height: '100%', // Makes the image fill the available height
    borderRadius: 10, // Matches the rounded corners
  },
});

export default ImageCarousel;
