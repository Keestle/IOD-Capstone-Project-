// Create the blueprints or schema for the budget calculator here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetCalculatorSchema = new Schema({
  userId: { type: String },
  budgetName: { type: String, required: false },
  totalEstimatedCost: { type: Number, required: false },
  totalActualCost: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("budgetCalculator", budgetCalculatorSchema);
