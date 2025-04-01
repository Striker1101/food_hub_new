const { faker } = require("@faker-js/faker");
const sequelize = require("../index");
const Product = require("../models/Product");
const Restaurant = require("../models/Restaurant");

const seedProducts = async () => {
  try {
    await sequelize.sync(); // Ensure tables are synced

    const restaurants = await Restaurant.findAll();
    if (restaurants.length === 0) {
      console.log(
        "No restaurants found. Add restaurants before seeding products."
      );
      return;
    }

    const dataSet = [
      {
        id: "101",
        name: "Grill Burger",
        price: 275,
        description: "Onion, Grilled Cheese, mashrooms, tomato, Red Sauce",
        rating: 4.1,
        ratings: 43,
        category: "Burgers",
        image:
          "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdyaWxsJTIwYnVyZ2VyfGVufDB8fDB8fHww",
        veg: true,
        bestSeller: false,
        quantity: 1,
      },
      {
        id: "102",
        name: "Chilly Chicken",
        price: 285,
        description:
          "E: 604.42 KCal (163.36 KCal), C: 29.67 Grams (8.02 Grams), P: 50.63 Grams (13.68 Grams), F: 30.94 Grams (8.36 Grams)",
        rating: 4.3,
        ratings: 34,
        category: "Burgers",
        image:
          "https://plus.unsplash.com/premium_photo-1683657860029-05a5415fa618?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNoaWNrZW4lMjBwaWVjZXxlbnwwfHwwfHx8MA%3D%3D",
        veg: false,
        bestSeller: true,
        quantity: 1,
      },
      {
        id: "103",
        name: "Smash",
        price: 250,
        description:
          "E: 1327.35 KCal (126.41 KCal), C: 213.24 Grams (20.31 Grams), P: 26.99 Grams (2.57 Grams), F: 38.46 Grams (3.66 Grams)",
        rating: 4.5,
        ratings: 56,
        category: "Burgers",
        image:
          "https://images.unsplash.com/photo-1688246780164-00c01647e78c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c21hc2glMjBidXJnZXJ8ZW58MHx8MHx8fDA%3D",
        veg: true,
        bestSeller: false,
        quantity: 1,
      },
      {
        id: "104",
        name: "Light Burger",
        price: 220,
        description:
          "E: 871.69 KCal (272.40 KCal), C: 21.54 Grams (6.73 Grams), P: 51.90 Grams (16.22 Grams), F: 64.36 Grams (20.11 Grams",
        rating: 3.8,
        ratings: 22,
        category: "Burgers",
        image:
          "https://images.unsplash.com/photo-1521305916504-4a1121188589?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c21hbGwlMjBidXJnZXJ8ZW58MHx8MHx8fDA%3D",
        veg: true,
        bestSeller: true,
        quantity: 1,
      },
      {
        id: "105",
        name: "Pasta",
        price: 300,
        description:
          "E: 544.39 KCal (155.54 KCal), C: 25.11 Grams (7.17 Grams), P: 45.15 Grams (12.90 Grams), F: 27.91 Grams (7.97 Grams)",
        rating: 4.5,
        ratings: 45,
        category: "Burgers",
        image:
          "https://plus.unsplash.com/premium_photo-1664472619078-9db415ebef44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGFzdGF8ZW58MHx8MHx8fDA%3D",
        veg: false,
        bestSeller: true,
        quantity: 1,
      },
      {
        id: "201",
        name: "Regular",
        price: 260,
        description:
          "E: 1142.26 KCal (163.18 KCal), C: 125.05 Grams (17.86 Grams), P: 40.11 Grams (5.73 Grams), F: 51.37 Grams (7.34 Grams)",
        rating: 4.3,
        category: "Fries",
        ratings: 34,
        image:
          "https://images.unsplash.com/photo-1480076732613-644bee94d3c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEZyaWVzfGVufDB8fDB8fHww",
        veg: false,
        bestSeller: true,
      },
      {
        id: "202",
        name: "Cheese Fries",
        price: 220,
        category: "Fries",
        description:
          "E: 1729.51 KCal (164.72 KCal), C: 204.54 Grams (19.48 Grams), P: 44.03 Grams (4.19 Grams), F: 79.02 Grams (7.53 Grams)",
        rating: 4.3,
        ratings: 52,
        image:
          "https://images.unsplash.com/photo-1666304752980-678d5c35c911?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoZWVzZSUyMGZyaWVzfGVufDB8fDB8fHww",
        veg: false,
        bestSeller: false,
      },
      {
        id: "203",
        name: "Crinkle Fries",
        price: 190,
        category: "Fries",
        description:
          "E: 1477.00 KCal (140.67 KCal), C: 204.14 Grams (19.44 Grams), P: 22.90 Grams (2.18 Grams), F: 59.95 Grams (5.71 Grams)",
        rating: 4.6,
        ratings: 56,
        image:
          "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JpbmtsZSUyMGZyaWVzfGVufDB8fDB8fHww",
        veg: true,
        bestSeller: true,
      },
      {
        id: "204",
        name: "Poutine Fries",
        price: 195,
        category: "Fries",
        description:
          "E: 1832.30 KCal (174.50 KCal), C: 246.73 Grams (23.50 Grams), P: 27.51 Grams (2.62 Grams), F: 78.15 Grams (7.44 Grams)",
        rating: 4.5,
        ratings: 48,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Food_at_WIkimanian_2017_02.jpg/220px-Food_at_WIkimanian_2017_02.jpg",
        veg: true,
        bestSeller: false,
      },
      {
        id: "91",
        name: "Fanta",
        price: 260,
        category: "Drinks",
        rating: 5,
        description: "1/2 litter",
        image:
          "https://images.unsplash.com/photo-1632818924360-68d4994cfdb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFudGF8ZW58MHx8MHx8fDA%3D",
      },
      {
        id: "92",
        name: "CocaCola",
        price: 260,
        rating: 5,
        category: "Drinks",
        description: "1/2 litter",
        image:
          "https://images.unsplash.com/photo-1592232583482-ec6367cfb786?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29jYSUyMGNvbGF8ZW58MHx8MHx8fDA%3D",
      },
      {
        id: "93",
        name: "Sprite",
        price: 260,
        rating: 5,
        category: "Drinks",
        description: "1/2 litter",
        image:
          "https://images.pexels.com/photos/4161715/pexels-photo-4161715.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: "94",
        name: "Tea",
        price: 260,
        category: "Drinks",
        rating: 5,
        description: "1/2 litter",
        image:
          "https://images.pexels.com/photos/4974543/pexels-photo-4974543.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ];

    const products = [];
    for (let i = 0; i < 12; i++) {
      // Create 20 fake products
      const randomRestaurant =
        restaurants[Math.floor(Math.random() * restaurants.length)];
      products.push({
        restaurantId: randomRestaurant.id,
        name: dataSet[i].name,
        description: dataSet[i].description,
        price: parseFloat(faker.commerce.price({ min: 5, max: 50 })),
        stock: faker.number.int({ min: 0, max: 100 }),
        image: dataSet[i].image,
        category: dataSet[i].category,
        isAvailable: faker.datatype.boolean(),
        rating: parseFloat(
          faker.number.float({ min: 0, max: 5, precision: 0.1 })
        ),
      });
    }

    await Product.bulkCreate(products);
    console.log("✅ Products seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding products:", error);
  } finally {
    await sequelize.close();
  }
};

module.exports = seedProducts;
