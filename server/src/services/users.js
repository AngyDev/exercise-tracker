const db = require("../db/database");

const getUsers = () => {
  return db.query("SELECT * FROM users");
};

const createUser = (user) => {
  const { _id, username } = user;
  const result = db.run("INSERT INTO users (_id, username) VALUES (@_id, @username)", { _id, username });

  let message = "Error in creating user";

  if (result.changes) {
    message = "User created successfully";
  }

  return { message };
};

module.exports = { getUsers, createUser };
