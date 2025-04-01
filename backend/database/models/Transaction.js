const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const PaymentMethod = require("./PaymentMethod");
const OrderItem = require("./OrderItem");
const User = require("./User");

const Transaction = sequelize.define(
  "Transaction",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    paymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: PaymentMethod, key: "id" },
    },
    orderItemId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: OrderItem, key: "id" },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USD",
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Transaction;
