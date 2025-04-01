const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const Restaurant = require("./Restaurant");

const Product = sequelize.define(
  "Product",
  {
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Restaurant, key: "id" },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    timestamps: true,
    tableName: "Products",
  }
);

Restaurant.hasMany(Product, {
  foreignKey: "restaurantId",
  onDelete: "CASCADE",
});

module.exports = Product;
