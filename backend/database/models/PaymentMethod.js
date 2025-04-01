const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const PaymentMethod = sequelize.define(
  "PaymentMethod",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM(
        "credit_card",
        "mobile_wallet",
        "bank_transfer",
        "on_deliver"
      ),
      allowNull: false,
    },
    details: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = PaymentMethod;
