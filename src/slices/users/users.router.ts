import { Router } from 'express';
import { GetUsers } from './application/get-users';
import { container } from 'tsyringe';
import { CreateUser } from './application/create-user';
import { LoginUser } from './application/login-user';
import { authMiddleware } from '../../shared/middleware/authMiddleware';
import { UpdateUser } from './application/update-user';
import { GetUserById } from './application/get-user-by-id';
import { CustomError } from '../../shared/errors';

const router = Router();

// Public routes
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = container.resolve(CreateUser);
    const user = await createUser.execute({ name, email, password });
    res.status(201).json(user.toPrimitives());
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = container.resolve(LoginUser);
    const token = await login.execute({ email, password });
    res.json(token);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

// Private routes
router.get('/list', authMiddleware, async (req, res) => {
  const getUsers = container.resolve(GetUsers);
  const users = await getUsers.execute();
  res.json(users.map((user) => user.toPrimitives()));
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const getUserById = container.resolve(GetUserById);
    const user = await getUserById.execute({ id });
    res.json(user.toPrimitives());
  } catch (error) {
    if (error instanceof CustomError) res.status(error.statusCode).json({ error: error.message });
    else res.status(400).json(error);
  }
});

router.put('/', authMiddleware, async (req, res) => {
  try {
    const updateUser = container.resolve(UpdateUser);
    await updateUser.execute(req.body);
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
