const loginSalesUser = require("../controllers/salesUser");
const express = require("express");

const salesUserRouter = express.Router();

salesUserRouter.post("/login", loginSalesUser);

module.exports = salesUserRouter;
