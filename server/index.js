const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}`);
})