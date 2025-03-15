import { Router } from 'express';
import { container } from 'tsyringe';
import { LoginUser } from '../../slices/users/application/login-user';
import { CreateUser } from '../../slices/users/application/create-user';

const router = Router();

// Public routes
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = container.resolve(CreateUser);
    const user = await createUser.execute({ name, email, password });
    res.status(201).json(user);
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

export default router;
