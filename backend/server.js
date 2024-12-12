if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");

const passport = require("passport");
const localStrategy = require("passport-local");
const Faculty = require("./models/faculty");

const app = express();
const port = 8080;

// Mongo connection
const dbUrl = process.env.ATLAS_DB_URI;
mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Failed to connect:", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  res.send("Register");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
