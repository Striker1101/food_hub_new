const OrderItem = require("../database/models/OrderItem");
const User = require("..//database/models/User");
const PaymentMethod = require("..//database/models/PaymentMethod");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, products, price, paymentMethodId } = req.body;

    if (!userId || !products || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = await OrderItem.create({
      UserId: userId,
      products: JSON.parse(products),
      price,
      paymentMethodId,
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await OrderItem.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: PaymentMethod, attributes: ["id", "name"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderItem.findByPk(id, {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: PaymentMethod, attributes: ["id", "name"] },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "processing", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await OrderItem.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
