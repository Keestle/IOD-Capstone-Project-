const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  budgetId: { type: String },
  userId: { type: String },
  itemName: { type: String },
  itemLink: { type: String },
  estimateCost: { type: String, required: true },
  actualCost: { type: String, required: true },
});

module.exports = mongoose.model("item", itemSchema);
