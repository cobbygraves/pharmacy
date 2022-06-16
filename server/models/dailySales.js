const mongoose = require("mongoose");

const dailySalesSchema = mongoose.Schema({
  sales: {
    type: Number,
  },
  drugs: {
    type: Array,
  },
});

const dailySalesModel = mongoose.model("dailysale", dailySalesSchema);

module.exports = dailySalesModel;
