require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set the view engine to ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index", { user: null, exercises: null });
});

app.use("/api/users", require("./routes/users"));

app.listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}`);
});
