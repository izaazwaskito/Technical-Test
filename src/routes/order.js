const express = require("express");
const router = express.Router();
const orderController = require("../controller/order");
const { protect } = require("../middlewares/auth");
router
  .get("/", orderController.getAllOrder)
  .get("/:id", protect, orderController.getDetailOrder)
  .post("/", protect, orderController.createOrder)
  .put("/:id", protect, orderController.updateOrder)
  .delete("/:id", protect, orderController.deleteOrder);

module.exports = router;
