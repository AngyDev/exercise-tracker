require("dotenv").config();
const express = require("express");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// set the view engine to ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index", { user: null, exercises: null, exercisesList: null });
});

app.use("/api/users", require("./routes/users"));

app.listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}`);
});
