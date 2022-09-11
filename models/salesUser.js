const mongoose = require("mongoose");

const SalesUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Required",
  },
  password: {
    type: String,
    required: "Required",
  },
});

const SalesUserModel = mongoose.model("sale", SalesUserSchema);

module.exports = SalesUserModel;
