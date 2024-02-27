"use strict";
let Models = require("../models");

//Abstraction: Create CRUD operations for specific items in the budget - handling logic

//C - Create the item
const createItem = (data, res) => {
  console.log(data);
  new Models.item(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//R - Read the item
const getItem = (res) => {
  // finds all items
  Models.item
    .find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//U - Update the item
const updateItem = (newData, res) => {
  const { _id, updatedData } = newData;
  Models.item
    .findByIdAndUpdate(_id, updatedData, { new: true })
    .then((updatedItem) => {
      if (!updateItem) {
        res.send({ result: 404, error: "No item with this Id found." });
      } else {
        res.send({ result: 200, data: updatedItem });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//D - Delete the item
const deletedItem = (itemId, res) => {
  Models.item
    .findByIdAndDelete(itemId)
    .then((deletedItem) => {
      if (!deletedItem) {
        res.send({ result: 500, error: "No budget with this Id found." });
      } else {
        res.send({ result: 200, data: deletedItem });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  createItem,
  getItem,
  updateItem,
  deletedItem,
};
