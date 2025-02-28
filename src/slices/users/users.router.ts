import { Router } from 'express';
import { GetUsers } from './application/GetUsers';

const router = Router();
const getUsers = new GetUsers();

router.get('/', (req, res) => {
  const users = getUsers.execute();
  res.json(users);
});

export default router;
