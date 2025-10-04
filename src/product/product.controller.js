const express = require("express");
const prisma = require("../db");
const {
  getProductById,
  createProduct,
  deleteProduct,
} = require("./product.service");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json({ data: products });
});

router.get("/:id", async (req, res) => {
  const productId = Number(req.params.id);

  try {
    const product = await getProductById(productId);
    res.status(200).send({ data: product });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { name, price, description, image } = req.body;

  if (!name || !price || !description || !image) {
    return res.status(400).send({
      error: "Field name dan price wajib diisi!",
    });
  }

  try {
    const product = await createProduct(name, price, description, image);
    res.status(201).send({
      data: product,
      message: "Create product success!",
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const productId = Number(req.params.id);

  try {
    await deleteProduct(productId);
    res.status(200).send({
      message: "Product deleted!",
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const { name, price, description, image } = req.body;

  if (!(name && price && description && image)) {
    return res.status(400).send("Some fields are missing!");
  }

  const product = await prisma.product.update({
    where: {
      id: Number(productId),
    },
    data: {
      description: description,
      image: image,
      name: name,
      price: price,
    },
  });
  res.send({
    data: product,
    message: "Update product success!",
  });
});

router.patch("/:id", async (req, res) => {
  const productId = req.params.id;
  const { name, price, description, image } = req.body;

  const product = await prisma.product.update({
    where: {
      id: Number(productId),
    },
    data: {
      description: description,
      image: image,
      name: name,
      price: price,
    },
  });
  res.send({
    data: product,
    message: "Patch product success!",
  });
});

module.exports = router;
