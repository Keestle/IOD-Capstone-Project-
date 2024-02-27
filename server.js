const express = require("express");
const app = express();
require("dotenv").config();

require("./dbConnect");
let userRoutes = require("./routes/userRoutes");
let budgetCalculatorRoutes = require("./routes/budgetCalculatorRoutes");
let itemRoutes = require("./routes/itemRoutes");

// parse requests of content-type - application/json
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "The start of Nickel Nomad." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.use("/api/users", userRoutes);
app.use("/api/budgetCalculator", budgetCalculatorRoutes);
app.use("/api/items", itemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
