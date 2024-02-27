"use strict";
let Models = require("../models");

//Abstraction: Create CRUD operations for budget calculator - handling logic

//C - Create the budget
const createBudget = (data, res) => {
  console.log(data);
  new Models.budgetCalculator(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//R - Read the budget
const getBudget = (res) => {
  // finds all budgets
  Models.budgetCalculator
    .find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//U - Update the budget
const updateBudget = (newData, res) => {
  const { _id, updatedData } = newData;
  Models.budgetCalculator
    .findByIdAndUpdate(_id, updatedData, { new: true })
    .then((updatedBudget) => {
      if (!updatedBudget) {
        res.send({ result: 404, error: "No budget with this Id found." });
      } else {
        res.send({ result: 200, data: updatedBudget });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//D - Delete the budget
const deleteBudget = (budgetId, res) => {
  Models.budgetCalculator
    .findByIdAndDelete(budgetId)
    .then((deletedBudget) => {
      if (!deletedBudget) {
        res.send({ result: 500, error: "No budget with this Id found." });
      } else {
        res.send({ result: 200, data: deletedBudget });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  createBudget,
  getBudget,
  updateBudget,
  deleteBudget,
};
