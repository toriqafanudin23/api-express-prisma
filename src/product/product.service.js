const prisma = require("../db");

const getProductById = async (productId) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found!");
  }

  return product;
};

const createProduct = async (name, price, description, image) => {
  const product = await prisma.product.create({
    data: {
      name,
      price,
      description,
      image,
    },
  });
  return product;
};

const deleteProduct = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new Error("Product not found!");
  }
  await prisma.product.delete({
    where: {
      id: productId,
    },
  });
};

module.exports = { getProductById, createProduct, deleteProduct };
