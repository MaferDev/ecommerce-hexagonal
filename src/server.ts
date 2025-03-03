import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'reflect-metadata';
import setRouter from './config/routes';
import { container } from 'tsyringe';
import { UserRepository } from './slices/users/infraestructure/repositories/mysql-users.repository';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

setRouter(app);

// Registrar las dependencias en el contenedor de tsyringe
container.register('UserRepository', { useClass: UserRepository });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
