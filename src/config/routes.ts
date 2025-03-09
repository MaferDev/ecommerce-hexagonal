import usersRouter from '../slices/users/users.router';
import productRouter from '../slices/products/products.router';

const setRouter = (app: any) => {
  app.use('/user', usersRouter);
  app.use('/product', productRouter);
};

export default setRouter;
