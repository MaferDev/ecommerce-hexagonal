import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'reflect-metadata';
import setRouter from './routes';
import { container } from 'tsyringe';
import rateLimit from 'express-rate-limit';
import { UserRepositoryMysql } from './slices/users/infraestructure/repositories/mysql-users.repository';
import { ProductRepositoryMysql } from './slices/products/infraestructure/repositories/mysql-products.repository';
import { OrderRepositoryMysql } from './slices/orders/infraestructure/repositories/mysql-orders.repository';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Limitar las peticiones a 100 por cada 15 minutos
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });

// app.use(limiter);

setRouter(app);

// Registrar las dependencias en el contenedor de tsyringe
container.register('UserRepository', { useClass: UserRepositoryMysql });
container.register('ProductRepository', { useClass: ProductRepositoryMysql });
container.register('OrderRepository', { useClass: OrderRepositoryMysql });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
