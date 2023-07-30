import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
