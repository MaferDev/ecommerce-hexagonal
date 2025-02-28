import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import usersRouter from './slices/users/users.router';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
