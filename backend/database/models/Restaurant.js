const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const User = require("./User");

const Restaurant = sequelize.define(
  "Restaurant",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    status: {
      type: DataTypes.ENUM("open", "closed"),
      allowNull: false,
      defaultValue: "open",
    },
    cuisineType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deliveryTime: {
      type: DataTypes.STRING, // e.g., "30-40 mins"
      allowNull: false,
      defaultValue: "30 - 40 mins",
    },
    minimumOrder: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    serviceFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    featuredImage: {
      type: DataTypes.STRING, // Storing URL as string
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON, // Storing images array as JSON
      allowNull: false,
      defaultValue: [], // Ensures it's an empty array if no images are added
    },
    noOfDelivery: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    details: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  { timestamps: true }
);

module.exports = Restaurant;
