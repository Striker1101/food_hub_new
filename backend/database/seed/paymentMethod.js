const PaymentMethod = require("../models/PaymentMethod");
const sequelize = require("../index"); // Sequelize instance

const seedPaymentMethods = async () => {
  try {
    // await sequelize.sync({ force: false });
    await sequelize.sync();

    const methods = [
      { name: "Visa", type: "credit_card" },
      { name: "MasterCard", type: "credit_card" },
      { name: "PayPal", type: "mobile_wallet" },
      { name: "Stripe", type: "mobile_wallet" },
      { name: "Bank Transfer", type: "bank_transfer" },
      { name: "On Counter", type: "on_deliver" },
    ];

    await PaymentMethod.bulkCreate(methods);
    console.log("Payment methods seeded successfully.");
  } catch (error) {
    console.error("Error seeding payment methods:", error);
  } finally {
    process.exit();
  }
};

module.exports = seedPaymentMethods;
