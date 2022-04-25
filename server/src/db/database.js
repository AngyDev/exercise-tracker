const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./exercise-tracker.db", (err) => {
  if (err) {
    return console.error(err.message);
  } else {
    db.run("")
  }
});
