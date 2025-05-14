const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const PaymentMethod = require("./PaymentMethod");
const Customer = require("./Customer");
const User = require("./User");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    resId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    products: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("pending", "processing", "delivered", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    paymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: PaymentMethod,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "OrderItems",
  }
);

module.exports = OrderItem;
