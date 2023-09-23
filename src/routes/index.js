const express = require("express");
const router = express.Router();
const jobRouter = require("./job");
const usersRouter = require("../routes/user");

router.use("/job", jobRouter);
router.use("/user", usersRouter);

module.exports = router;
