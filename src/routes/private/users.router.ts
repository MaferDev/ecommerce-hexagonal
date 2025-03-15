import { Router } from 'express';
import { container } from 'tsyringe';
import { authMiddleware } from '../../shared/middleware/authMiddleware';
import { CustomError } from '../../shared/errors';
import { GetUsers } from '../../slices/users/application/get-users';
import { GetUserById } from '../../slices/users/application/get-user-by-id';
import { UpdateUser } from '../../slices/users/application/update-user';

const router = Router();

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
