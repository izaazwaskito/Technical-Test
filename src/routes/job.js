const express = require("express");
const router = express.Router();
const jobController = require("../controller/job");
const { protect } = require("../middlewares/auth");
router
  .get("/", protect, jobController.getAllJob)
  .get("/:id", protect, jobController.getDetailJob);

module.exports = router;
