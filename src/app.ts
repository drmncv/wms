import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import auth from './middlewares/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || '3000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoutes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
