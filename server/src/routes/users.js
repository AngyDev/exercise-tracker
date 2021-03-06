const express = require("express");
const moment = require("moment");
const router = express.Router();
const users = require("../services/users");
const { v4: uuidv4 } = require("uuid");
const { validateUser } = require("../utils/validation/users");
const { validateExercise } = require("../utils/validation/exercise");

// Create user
router.post("/", (req, res, next) => {
  try {
    // Checks if the username is valid
    if (validateUser(req.body.username)) {
      const user = {
        username: req.body.username,
        _id: uuidv4(),
      };

      // TODO: return the object not the result
      const result = users.createUser(user);

      // Checks if the user was created successfully
      if (result.changes) {
        // res.json(user);
        res.render("pages/index", { user: user, exercises: null });
      } else {
        res.status(400).send("Error in creating user");
      }
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
router.post("/:_id/exercises", (req, res, next) => {
  try {
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    const exercise = {
      description,
      duration,
      date: date !== "" ? moment(date).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"), // 2022-05-04
      _id: uuidv4(),
    };
    // Find the user by Id
    const user = users.getUserById(_id);

    // Checks if the user exists
    if (user) {
      const validationMessage = validateExercise(exercise);

      // Checks if the exercise is valid
      if (validationMessage === "") {
        // Insert the exercise
        const result = users.createUserExercise(_id, exercise);

        // If the exercise was created successfully create an object with exercise and user
        if (result.changes) {
          const userExercises = {
            username: user.username,
            _id: user._id,
            description: exercise.description,
            duration: parseInt(exercise.duration),
            date: new Date(exercise.date).toDateString(), // Wed May 04 2022
          };
          // res.json(userExercises);
          res.render("pages/index", { user: { username: user.username, _id: user._id }, exercises: userExercises });
        } else {
          res.status(400).send("Error in creating user exercise");
        }
        // res.json();
      } else {
        res.status(400).json({ message: validationMessage });
      }
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    console.error("Error while getting user: ", error.message);
    next(error);
  }
});

// Gets a full exercise log of any user
router.get("/:_id/logs", (req, res, next) => {
  try {
    const { _id } = req.params;

    // Find the user by Id
    const user = users.getUserById(_id);

    if (user) {
      const exercises = users.getUserExercies(_id);

      const exercisesList = {
        username: user.username,
        _id: user._id,
        count: exercises.length,
        log: exercises.map((exercise) => {
          return { ...exercise, date: new Date(exercise.date).toDateString() };
        }),
      };

      res.render("pages/userExercises", { exercisesList: exercisesList });
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    console.error("Error while getting user: ", error.message);
    next(error);
  }
});

// Retrieves part of the log of any user
router.get("/:_id/logs/:from/:to/:limit", (req, res, next) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.params;

    // Find the user by Id
    const user = users.getUserById(_id);

    if (user) {
      const exercises = users.getUserExerciesFromTo(_id, from, to, limit);

      res.json({
        username: user.username,
        _id: user._id,
        count: exercises.length,
        log: exercises.map((exercise) => {
          return { ...exercise, date: new Date(exercise.date).toDateString() };
        }),
      });
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    console.error("Error while getting user: ", error.message);
    next(error);
  }
});

module.exports = router;
