import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useRouter } from 'expo-router';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState(''); // Manage search input state
  const router = useRouter(); // Access router for navigation

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim(); // Normalize input

    if (!query) {
      Alert.alert('Empty Search', 'Please enter a valid search term.');
      return;
    }

    // Define keywords for navigation
    const foodKeywords = [
      'burger',
      'chilly chicken',
      'smash',
      'light burger',
      'pasta',
      'regular',
      'cheese fries',
      'crinkle fries',
      'poutine',
      'cola',
      'cocacola',
      'coca cola',
      'fanta',
      'drink',
      'sprite',
      'pepsi',
      'tea',
      'drinks',
      'fries'
    ];
    const hotelKeywords = ['hotel', 'burger point'];

    // Check if the query matches food or hotel keywords
    if (foodKeywords.some((keyword) => query.includes(keyword))) {
      router.push('/(home)/hotel'); // Navigate to the Food page
    } else if (hotelKeywords.some((keyword) => query.includes(keyword))) {
      router.push('/'); // Stay on the Hotel page
    } else {
      Alert.alert('No Results', 'No matching section found.');
    }

    Keyboard.dismiss(); // Dismiss the keyboard after search
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#DDD',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 12,
        marginHorizontal: 10,
        backgroundColor: '#F9F9F9',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      <TextInput
        placeholder="Search for Food, Hotel, etc."
        placeholderTextColor="#BBB"
        style={{ flex: 1, fontSize: 15, color: '#333' }}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch} // Trigger search when the return key is pressed
        returnKeyType="search" // Change return key text to "Search"
      />
      <TouchableOpacity onPress={handleSearch}>
        <Fontisto name="search" size={22} color="#FF4D4D" />
      </TouchableOpacity>
    </View>
  );
}
