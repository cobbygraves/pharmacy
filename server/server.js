const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const adminUserRoute = require("./routes/adminUser");
const salesUserRoute = require("./routes/salesUser");
const drugRoute = require("./routes/drug");
const dailySales = require("./routes/dailySales");

const server = express();

server.use(express.json({ limit: "200mb", extended: true }));
server.use(express.urlencoded({ limit: "200mb", extended: true }));
server.use(cors());

server.use("/user/admin", adminUserRoute);
server.use("/user/sales", salesUserRoute);
server.use("/drug", drugRoute);
server.use("/sales", dailySales);

//server listening at port 5000

const PORT = process.env.PORT || 5000;

server.listen(PORT, (err) => {
  if (!err) {
    mongoose.connect(
      process.env.MONGO_URL,
      { useUnifiedTopology: true, useNewUrlParser: true },
      (err) => {
        if (!err) {
          console.log("Connections Successful");
        } else {
          console.log("Error Connecting To Database");
        }
      }
    );
  } else {
    console.log("Error Connecting To Server");
  }
});
