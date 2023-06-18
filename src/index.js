import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user/userRoute.js';
import postRoutes from './routes/post/postRoute.js';

const app = express();
const PORT = 8080;

dotenv.config();

process.env.MONGO_SRV
  ? mongoose
      .connect(process.env.MONGO_SRV)
      .then(() => console.log('Connected to database'))
      .catch((error) => console.error('Error connecting to database:', error))
  : console.error('MONGO_SRV is not defined in the environment variables');

app.use(express.json());
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/post', postRoutes);

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});
