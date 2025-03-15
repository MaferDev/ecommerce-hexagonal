import { Router } from 'express';
import { container } from 'tsyringe';
import { authMiddleware } from '../../shared/middleware/authMiddleware';
import { CreateOrderRequestDTO } from '../../slices/orders/infraestructure/dtos/create-order.request.dto';
import { CreateOrder } from '../../slices/orders/application/create-order';
import { GerOrders } from '../../slices/orders/application/get-orders';
import { DeleteOrder } from '../../slices/orders/application/delete-order';
import { GerOrderById } from '../../slices/orders/application/get-order-by-id';
import { SearchDTO } from '../../shared/dtos/search-pagination.dto';

const router = Router();

router.get('/list', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string);
    const perPage = parseInt(req.query.per_page as string);

    const search: SearchDTO = { page, perPage };
    const getOrder = container.resolve(GerOrders);
    const order = await getOrder.execute(search);
    res.json(order);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const body: CreateOrderRequestDTO = req.body;
    // const userId = (req as any).user.id;
    const createOrder = container.resolve(CreateOrder);
    const orders = await createOrder.execute(body);
    res.json(orders);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const getOrderById = container.resolve(GerOrderById);
    const order = await getOrderById.execute({ id });
    res.json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const deleteOrder = container.resolve(DeleteOrder);
  await deleteOrder.execute({ id });
  res.status(204).send();
});

export default router;
