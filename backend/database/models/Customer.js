const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const User = require("./User");

const Customer = sequelize.define(
  "Customer",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    walletBalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    loyaltyPoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    orderCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    favoriteRestaurants: {
      type: DataTypes.JSON, // Array of restaurant IDs
      allowNull: true,
    },
  },
  { timestamps: true }
);

User.hasOne(Customer, { foreignKey: "userId", onDelete: "CASCADE" });
Customer.belongsTo(User, { foreignKey: "userId" });

module.exports = Customer;
