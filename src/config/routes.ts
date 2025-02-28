import usersRouter from '../slices/users/users.router';

const setRouter = (app: any) => {
  app.use('/users', usersRouter);
};
export default setRouter;
