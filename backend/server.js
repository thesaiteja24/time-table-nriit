if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Faculty = require("./models/faculty");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// Basic passport local strategy
passport.use(new LocalStrategy(Faculty.authenticate()));

// MongoDB connection
const dbUrl = process.env.ATLAS_DB_URI;
mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Failed to connect to DB:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Register route
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await Faculty.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const faculty = new Faculty({ username, email });
    await Faculty.register(faculty, password);

    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login route
app.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Authentication error" });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: info.message || "Invalid credentials" });
    }

    return res.json({
      message: "Login successful!",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  })(req, res, next);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
