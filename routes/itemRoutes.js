let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

// Routing or mapping the browser requests to the controller function and getting a response back are done below per each HTTP command:
router.get("/", (req, res) => {
  Controllers.itemController.getItem(res);
});

router.post("/create", (req, res) => {
  Controllers.itemController.createItem(req.body, res);
});

router.put("/update", (req, res) => {
  Controllers.itemController.updateItem(req.body, res);
});

router.delete("/delete", (req, res) => {
  Controllers.itemController.deletedItem(req, res);
});

module.exports = router;
