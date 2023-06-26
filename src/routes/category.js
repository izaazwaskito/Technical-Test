const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");
const { protect } = require("../middlewares/auth");
router
  .get("/", categoryController.getAllCategory)
  .get("/:id", protect, categoryController.getDetailCategory)
  .post("/", protect, categoryController.createCategory)
  .put("/:id", protect, categoryController.updateCategory)
  .delete("/:id", protect, categoryController.deleteCategory);

module.exports = router;
