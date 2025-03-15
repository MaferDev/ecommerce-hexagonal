import { Router } from 'express';
import { container } from 'tsyringe';
import { GetProductById } from '../../slices/products/application/get-product-by-id';
import { GetProducts } from '../../slices/products/application/get-products';
import { SearchDTO } from '../../shared/dtos/search-pagination.dto';

const router = Router();

router.get('/list', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getProductById = container.resolve(GetProductById);
    const product = await getProductById.execute({ id });
    res.json(product.toPrimitives());
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
