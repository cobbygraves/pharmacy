const loginAdminUser = require("../controllers/adminUser");
const express = require("express");

const adminUserRouter = express.Router();

adminUserRouter.post("/login", loginAdminUser);

module.exports = adminUserRouter;
