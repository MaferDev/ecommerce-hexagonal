import { Router } from 'express';
import { GetUsers } from './application/GetUsers';
import { container } from 'tsyringe';

const router = Router();

router.get('/', (req, res) => {
  const getUsers = container.resolve(GetUsers);
  const users = getUsers.execute();
  res.json(users);
});

export default router;
