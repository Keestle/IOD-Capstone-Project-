let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

// Routing or mapping the browser requests to the controller function and getting a response back are done below per each HTTP command:
router.get("/", (req, res) => {
  Controllers.budgetCalculatorController.getBudget(res);
});

router.post("/create", (req, res) => {
  Controllers.budgetCalculatorController.createBudget(req.body, res);
});

router.put("/update", (req, res) => {
  Controllers.budgetCalculatorController.updateBudget(req.body, res);
});

router.delete("/delete", (req, res) => {
  Controllers.budgetCalculatorController.deleteBudget(req.body, res);
});

module.exports = router;
