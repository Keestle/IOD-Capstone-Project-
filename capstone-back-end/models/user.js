// Create the blueprints or schema for the user here
const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
});

module.exports= mongoose.model("user", userSchema);