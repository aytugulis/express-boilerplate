import 'dotenv/config';
import express from 'express';
import { router } from './routers';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on the port ${port}`);
});
