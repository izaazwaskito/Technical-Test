const express = require("express");
const router = express.Router();
const categorysRouter = require("../routes/category");
const productsRouter = require("../routes/product");
const ordersRouter = require("../routes/order");
const usersRouter = require("../routes/user");

router.use("/category", categorysRouter);
router.use("/product", productsRouter);
router.use("/order", ordersRouter);
router.use("/user", usersRouter);

module.exports = router;
