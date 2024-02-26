const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema ({
    budgetId: { type: String},
    userId: { type: String},
    itemName: { type: String},
    itemLink: { type: String},
    estimateCost: { type: Number},
    actualCost: { type: Number}
});

module.exports= mongoose. model("item", itemSchema);