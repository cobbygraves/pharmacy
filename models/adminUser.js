const mongoose = require("mongoose");

const AdminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Required",
  },
  password: {
    type: String,
    required: "Required",
  },
});

const AdminUserModel = mongoose.model("admin", AdminUserSchema);

module.exports = AdminUserModel;
