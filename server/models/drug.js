const mongoose = require("mongoose");

const DrugSchema = new mongoose.Schema({
  id: {
    type: String,
    required: "Required",
  },
  name: {
    type: String,
    required: "Required",
  },
  price: {
    type: Number,
    required: "Required",
  },
  expiry: {
    type: String,
  },
  stocked: {
    type: Number,
  },
  sold: {
    type: Number,
    required: "Required",
  },
  left: {
    type: Number,
    required: "Required",
  },
});

const DrugModel = mongoose.model("drug", DrugSchema);

module.exports = DrugModel;
