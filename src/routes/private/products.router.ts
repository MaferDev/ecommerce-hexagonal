import { Router } from 'express';
import { container } from 'tsyringe';
import { authMiddleware } from '../../shared/middleware/authMiddleware';
import { GetProductById } from '../../slices/products/application/get-product-by-id';
import { CreateProduct } from '../../slices/products/application/create-product';
import { UpdateProduct } from '../../slices/products/application/update-product';
import { DeleteProductById } from '../../slices/products/application/delete-product-by-id';
import { GetProducts } from '../../slices/products/application/get-products';
import { SearchDTO } from '../../shared/dtos/search-pagination.dto';

const router = Router();

router.get('/list', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string);
    const perPage = parseInt(req.query.per_page as string);

    const search: SearchDTO = { page, perPage };

    const getProducts = container.resolve(GetProducts);
    const products = await getProducts.execute(search);
    res.json(products);
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
