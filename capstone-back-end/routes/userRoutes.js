let express = require("express");
let router = express.Router();
let Controllers = require("../controllers/userController");

// Routing or mapping the browser requests to the controller function and getting a response back are done below per each HTTP command:
router.get("/", (req, res) => {
  Controllers.getUsers(res);
});

// Adds a POST route to create a new user
router.post("/create", (req, res) => {
  Controllers.createUser(req.body, res);
});

router.put("/update", (req, res) => {
  Controllers.updateUser(req.body, res);
});

router.delete("/delete", (req, res) => {
  Controllers.deleteUser(req.body, res);
});

module.exports = router;
