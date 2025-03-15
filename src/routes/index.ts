import usersRouter from './private/users.router';
import productRouter from './private/products.router';
import orderRouter from './private/order.router';

import usersPublicRouter from './public/users.router';
import productPublicRouter from './public/products.router';

const setRouter = (app: any) => {
  // Private routes
  app.use('/user', usersRouter);
  app.use('/product', productRouter);
  app.use('/order', orderRouter);

  // Public routes
  app.use('/public/user', usersPublicRouter);
  app.use('/public/product', productPublicRouter);
};

export default setRouter;
