require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});