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

    const category = ["Drink", "Meal"];

    const dataSet = [
      {
        name: "White Rice with Stew",
        price: 1300,
        category: category[1],
        rating: 5,
        description: "Two Spoon of rice, stew and meat",
        restaurantId: 15,
        isAvailable: "true",
        stock: 100,
        image:
          "https://img-global.cpcdn.com/recipes/b9a21d7844ba2ce6/1200x630cq70/photo.jpg",
      },
      {
        name: "Jollof Rice",
        price: 1300,
        category: category[1],
        rating: 5,
        description: "Two Spoon of Jollof Rice, Meat",
        restaurantId: 15,
        isAvailable: "true",
        stock: 100,
        image:
          "https://allnigerianfoods.com/wp-content/uploads/jollof_rice_recipe1-500x500.jpg",
      },
      {
        name: "Fried Rice",
        price: 1300,
        category: category[1],
        rating: 5,
        description: "Two Spoon of Fried rice and meat",
        restaurantId: 15,
        isAvailable: "true",
        stock: 100,
        image:
          "https://nkechiajaeroh.com/wp-content/uploads/2020/12/Nigerian-fried-rice-recipe-main-photo-3.jpg",
      },
      {
        name: "Rice",
        price: 1500,
        category: category[1],
        rating: 5,
        description: "White Rice 2 spoon",
        restaurantId: 14,
        isAvailable: "true",
        stock: 100,
        image:
          "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/06/23/0/FNK_Perfect-Long-Grain-White-Rice-H_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1592939598668.webp",
      },
      {
        name: "Beans",
        price: 1000,
        category: category[1],
        rating: 5,
        description: "Beans 3 spoon",
        restaurantId: 14,
        isAvailable: "true",
        stock: 100,
        image:
          "https://www.ohmyveg.co.uk/wp-content/uploads/2024/10/masala-beans-2-720x540.jpg",
      },
      {
        name: "Spaghetti",
        price: 300,
        category: category[1],
        rating: 5,
        description: "Two Spoon of Spaghetti",
        restaurantId: 14,
        isAvailable: "true",
        stock: 100,
        image:
          "https://stinkingood.com/wp-content/uploads/2022/01/iStock-178702421-scaled.jpg",
      },
    ];

    await Product.bulkCreate(dataSet);
    console.log("✅ Products seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding products:", error);
  } finally {
    await sequelize.close();
  }
};

module.exports = seedProducts;
