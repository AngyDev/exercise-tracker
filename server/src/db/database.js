const sqlite = require("better-sqlite3");
const path = require("path");
const db = new sqlite(path.resolve("src/db/exercise-tracker.db"), { fileMustExist: true });

const query = (sql) => {
  return db.prepare(sql).all();
}

const queryAll = (sql, params) => {
  return db.prepare(sql).all(params);
}

const params = (sql, params) => {
  return db.prepare(sql).get(params); // return a single row with params
}

const run = (sql, params) => {
  return db.prepare(sql).run(params);
}

module.exports = { query, queryAll, run, params };
