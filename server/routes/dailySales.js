const { updateSales, readSales } = require("../controllers/dailySales");
const express = require("express");

const dailySalesRouter = express.Router();

dailySalesRouter.get("/", readSales);
dailySalesRouter.put("/update", updateSales);

module.exports = dailySalesRouter;
