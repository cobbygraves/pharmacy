const {
  updateDrug,
  stockDrug,
  readDrugs,
  getDrug,
} = require("../controllers/drug");
const express = require("express");

const drugRouter = express.Router();

drugRouter.get("/", readDrugs);
drugRouter.get("/:id", getDrug);
drugRouter.post("/stock", stockDrug);
drugRouter.put("/update", updateDrug);

module.exports = drugRouter;
