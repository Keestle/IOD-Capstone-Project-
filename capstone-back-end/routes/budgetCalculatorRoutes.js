let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");
const Budget = require("../models/budgetCalculator");

// Routing or mapping the browser requests to the controller function and getting a response back are done below per each HTTP command:
router.get("/", (req, res) => {
  Controllers.budgetCalculatorController.getBudget(res);
});

router.get("/:id", (req, res) => {
  Controllers.budgetCalculatorController.getBudgetbyId(req, res);
});

router.post("/create", async (req, res) => {
  // Controllers.budgetCalculatorController.createBudget(req.body, res);
  try {
    const { budgetName, items } = req.body;

    // Save the budget name and items to MongoDB
    const newBudget = new Budget({
      budgetName,
      items,
    });

    await newBudget.save();

    res.status(201).json({ message: "Budget saved successfully" });
  } catch (error) {
    console.error("Error saving budget:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update", (req, res) => {
  Controllers.budgetCalculatorController.updateBudget(req.body, res);
});

router.delete("/:id", (req, res) => {
  Controllers.budgetCalculatorController.deleteBudget(req, res);
});

module.exports = router;
