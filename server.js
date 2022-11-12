const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const {
  updateDrug,
  stockDrug,
  readDrugs,
  getDrug,
} = require("./controllers/drug");
const loginAdminUser = require("./controllers/adminUser");
const { updateSales, readSales } = require("./controllers/dailySales");
const loginSalesUser = require("./controllers/salesUser");

const server = express();

server.use(express.json({ limit: "200mb", extended: true }));
server.use(express.urlencoded({ limit: "200mb", extended: true }));
server.use(cors());
server.use(express.static(path.join(__dirname, "client", "build")));

//adminUser route
server.post("/user/admin/login", loginAdminUser);

//sales routes
server.get("/sales", readSales);
server.put("/sales/update", updateSales);

//salesUser route
server.post("/user/sales/login", loginSalesUser);

//drug routes
server.get("/drug", readDrugs);
server.get("/drug/:id", getDrug);
server.post("/drug/stock", stockDrug);
server.put("/drug/update", updateDrug);

//index file route
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//server listening at port 5000

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGO_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (!err) {
      server.listen(PORT, (err) => {
        if (err) {
          console.log("Error Connecting To Server");
        } else {
          console.log("Connections Successful");
        }
      });
    } else {
      console.log("Error Connecting To Database");
    }
  }
);
