// Create the blueprints or schema for the budget calculator here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemName: { type: String },
  itemLink: { type: String },
  estimateCost: { type: Number, required: true },
  actualCost: { type: Number, required: true },
});

const budgetCalculatorSchema = new Schema({
  userId: { type: String },
  budgetName: { type: String, required: false },
  totalEstimatedCost: { type: Number, required: false },
  totalActualCost: { type: Number, required: false },
  items: [itemSchema], // Embedding items as an array within the budgetCalculatorSchema
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("budgetCalculator", budgetCalculatorSchema);
