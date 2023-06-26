const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload')
const productController = require('../controller/product');
const {hitCacheProductDetail,clearCacheProductDetail} = require('../middlewares/redis')
const {protect} = require('../middlewares/auth')
router
  .get("/", productController.getAllProduct)
  .get("/search",  productController.getNameProduct)
  .get("/:id", protect, hitCacheProductDetail, productController.getDetailProduct)
  .post("/", protect, upload.single('image_product'),productController.createProduct)
  .put("/:id", protect,clearCacheProductDetail, upload.single('image_product'),productController.updateProduct)
  .delete("/:id", protect, clearCacheProductDetail, productController.deleteProduct);

module.exports = router;