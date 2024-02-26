"use strict";
let Models = require("../models");

const getUsers = (res) => {
  // finds all users
  //   res.send({ result: 200, data: {} });
  Models.User.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createUser = (data, res) => {
  // creates a new user using JSON data POSTed in request body
  console.log(data);
  new Models.User(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateUser = (newData, res) => {
  // Updates a user by ID
  const { _id, updatedData } = newData; // Destructuring _id and updatedData from newData
  Models.User.findByIdAndUpdate(_id, updatedData, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        res.send({ result: 404, error: "User not found" });
      } else {
        res.send({ result: 200, data: updatedUser });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteUser = (userId, res) => {
  // Deletes a user by ID
  Models.User.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.send({ result: 404, error: "User not found" });
      } else {
        res.send({ result: 200, data: deletedUser });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
