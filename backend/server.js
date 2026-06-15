require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const documentRoutes = require("./src/routes/documentRoutes");
const signatureRoutes = require("./src/routes/signatureRoutes");
const auditRoutes = require("./src/routes/auditRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/signed-pdfs", express.static("signed-pdfs"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/docs", documentRoutes);
app.use("/api/signatures", signatureRoutes);
app.use("/api/audit", auditRoutes);

app.get("/test", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
