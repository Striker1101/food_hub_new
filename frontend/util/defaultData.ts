import { GroupedProducts, ProductType, RestaurantType } from "./dataType";

export const defaultRestaurant: RestaurantType = {
  userId: 1,
  name: "Sample Restaurant",
  description: "A great place to enjoy delicious meals.",
  address: "123 Main Street",
  city: "Sample City",
  state: "Sample State",
  zipCode: "12345",
  phone: "+1234567890",
  email: "info@samplerestaurant.com",
  website: "https://samplerestaurant.com",
  rating: 0.0,
  status: "open",
  cuisineType: "International",
  deliveryTime: "30 - 40 mins",
  minimumOrder: 10.0,
  serviceFee: 2.5,
  isVerified: false,
  featuredImage: "https://example.com/featured.jpg",
  images: [
    {
      description: "",
      image: "https://example.com/image1.jpg",
    },
    {
      description: "",
      image: "https://example.com/image2.jpg",
    },
  ],
  details: {
    bank_number: "",
    bank_name: "",
    account_name: "",
  },
  noOfDelivery: 0,
  latitude: 40.7128,
  longitude: -74.006,
};

export const defaultProducts: GroupedProducts[] = [
  {
    name: "Drinks",
    items: [
      {
        id: 1,
        name: "Coca-Cola",
        description: "Chilled Coca-Cola 500ml",
        price: 2.5,
        stock: 50,
        image: "https://example.com/coca-cola.jpg",
        category: "Drinks",
        isAvailable: true,
        rating: 4.5,
      },
      {
        id: 2,
        name: "Pepsi",
        description: "Refreshing Pepsi 500ml",
        price: 2.5,
        stock: 30,
        image: "https://example.com/pepsi.jpg",
        category: "Drinks",
        isAvailable: true,
        rating: 4.3,
      },
    ],
  },
  {
    name: "Fries",
    items: [
      {
        id: 3,
        name: "French Fries",
        description: "Crispy golden fries",
        price: 3.0,
        stock: 20,
        image: "https://example.com/fries.jpg",
        category: "Fries",
        isAvailable: true,
        rating: 4.7,
      },
    ],
  },
];

export const defaultProduct: ProductType = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  image: "",
  category: "",
  isAvailable: true,
  rating: 0,
};
