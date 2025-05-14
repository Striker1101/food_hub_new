const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  getRestaurantOrders,
  updateOrderStatus,
} = require("../controllers/OrderController.js");

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/restaurant/:res_id", getRestaurantOrders);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);

module.exports = router;
