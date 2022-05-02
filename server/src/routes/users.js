const express = require("express");
const router = express.Router();
const users = require("../services/users");
const { v4: uuidv4 } = require("uuid");
const { validateUser } = require("../utils/validation/users");

// Create user
router.post("/", (req, res, next) => {
  try {
    if (validateUser(req.body.username)) {
      const user = {
        username: req.body.username,
        _id: uuidv4(),
      };

      res.json(users.createUser(user));
    } else {
      res.status(400).send("Invalid username");
    }
  } catch (error) {
    console.error("Error while getting users: ", error.message);
    next(error);
  }
});

// Gets list of users
router.get("/", (req, res, next) => {
  try {
    res.json(users.getUsers());
  } catch (error) {
    console.error("Error while getting users: ", error.message);
    next(error);
  }
});

// Creates user exercises

// Gets a full exercise log of any user

// Retrieves part of the log of any user

module.exports = router;
