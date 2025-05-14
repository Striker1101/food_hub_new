const User = require("./models/User");
const sequelize = require("./index"); // Sequelize instance
const Transaction = require("./models/Transaction");
const PaymentMethod = require("./models/PaymentMethod");
const Restaurant = require("./models/Restaurant");
const Product = require("./models/Product");
const OrderItem = require("./models/OrderItem");

User.hasOne(Restaurant, { foreignKey: "userId", onDelete: "CASCADE" });
Restaurant.belongsTo(User, { foreignKey: "userId" });

Product.belongsTo(Restaurant, { foreignKey: "restaurantId" });

OrderItem.belongsTo(User, { foreignKey: "UserId", as: "customer" }); // user who placed the order
OrderItem.belongsTo(User, { foreignKey: "resId", as: "restaurant" }); // restaurant that receives it

OrderItem.belongsTo(PaymentMethod, { foreignKey: "paymentMethodId" });

//transaction
Transaction.belongsTo(User, { foreignKey: "userId" });
Transaction.belongsTo(PaymentMethod, { foreignKey: "paymentMethodId" });
User.hasMany(Transaction, { foreignKey: "userId" });

// Sync database
const syncDatabase = async () => {
  try {
    // await sequelize.sync({ alter: true, force: true });
    await sequelize.sync({ alter: false });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

// Export the function
module.exports = syncDatabase;
