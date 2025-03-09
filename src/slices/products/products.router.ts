import { Router } from 'express';
import { container } from 'tsyringe';
import { GetProducts } from './application/get-products';
import { authMiddleware } from '../../shared/middleware/authMiddleware';
import { GetProductById } from './application/get-product-by-id';
import { CreateProduct } from './application/create-product';
import { UpdateProduct } from './application/update-product';
import { DeleteProductById } from './application/delete-product-by-id';

const router = Router();

// Public  Router
router.get('/list', authMiddleware, async (req, res) => {
  try {
    const getProducts = container.resolve(GetProducts);
    const products = await getProducts.execute();
    res.json(products.map((product) => product.toPrimitives()));
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const getProductById = container.resolve(GetProductById);
    const product = await getProductById.execute({ id });
    res.json(product.toPrimitives());
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const createProduct = container.resolve(CreateProduct);
    const product = await createProduct.execute(req.body);
    res.status(201).json(product.toPrimitives());
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateProduct = container.resolve(UpdateProduct);
    const product = await updateProduct.execute({ id, ...req.body });
    res.json(product.toPrimitives());
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProductById = container.resolve(DeleteProductById);
    await deleteProductById.execute({ id });
    res.status(200).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
