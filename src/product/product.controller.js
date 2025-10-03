const express = require("express");
const prisma = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

module.exports = router;
