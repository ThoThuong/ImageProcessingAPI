import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import morgan from 'morgan';
import router from './routers/main';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
  console.info(`Server is starting at port: ${PORT}`);
});
export default app;
