const db = require("../db/database");

const getUsers = () => {
  return db.query("SELECT * FROM users");
};

const createUser = (user) => {
  const { _id, username } = user;
  const result = db.run("INSERT INTO users (_id, username) VALUES (@_id, @username)", { _id, username });

  return result;
  // let message = "Error in creating user";

  // if (result.changes) {
  //   message = "User created successfully";
  // }

  // return { message };
};

const getUserById = (_id) => {
  return db.params("SELECT * FROM users WHERE _id = ?", _id);
};

const getUserByUsername = (username) => {
  return db.params("SELECT * FROM users WHERE username = ?", username);
}

const createUserExercise = (userId, exercise) => {
  const { _id, description, duration, date } = exercise;
  const result = db.run("INSERT INTO exercises (_id, description, duration, date, userId) VALUES (@_id, @description, @duration, @date, @userId)", {
    _id,
    description,
    duration,
    date,
    userId,
  });

  return result;

  // let message = "Error in creating user exercise";

  // if (result.changes) {
  //   message = "User exercise created successfully";
  // }

  // return { message };
};

const getUserExercies = (userId) => {
  return db.queryAll("SELECT description, duration, date FROM exercises WHERE userId = ?", userId);
};

const getUserExerciesFromTo = (userId, from, to, limit) => {
  return db.queryAll("SELECT description, duration, date FROM exercises WHERE userId = ? AND date BETWEEN ? AND ? LIMIT ?", [userId, from, to, limit]);
};

module.exports = { getUsers, createUser, getUserById, getUserByUsername, createUserExercise, getUserExercies, getUserExerciesFromTo };
