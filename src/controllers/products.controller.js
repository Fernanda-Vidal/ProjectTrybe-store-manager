const service = require('../services');
// const errorMap = require('../utils/errorMap');

const getProduct = async (_req, res) => {
  const { type, message } = await service.productService.getAllProducts();
  if (type) return res.status(type).json(message);

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { productId } = req.params;
  const { type, message } = await service.productService.getProductById(productId);

  if (type !== null) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await service.productService.addProduct(name);
  
  if (type !== null) return res.status(404).json({ message: 'Invalid Name' });

  res.status(201).json({ id: message, name });
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
};