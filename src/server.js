const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 2000;

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

const productController = require("./product/product.controller");
app.use("/products", productController);

app.listen(PORT, () => {
  console.log("Server running on: " + PORT);
});
