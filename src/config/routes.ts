import usersRouter from '../slices/users/users.router';

const setRouter = (app: any) => {
  app.use('/user', usersRouter);
};
export default setRouter;
