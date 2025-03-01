import { Router } from 'express';
import { GetUsers } from './application/GetUsers';
import { container } from 'tsyringe';
import { CreateUser } from './application/CreateUser';

const router = Router();

router.get('/list', async (req, res) => {
  const getUsers = container.resolve(GetUsers);
  const users = await getUsers.execute();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const createUser = container.resolve(CreateUser);
  const user = await createUser.execute({ name, email, password });
  res.status(201).json(user);
});

export default router;
