import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';

import { errorHandler } from './middlewares/error.middleware';
import { router } from './routers';

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on the port ${port}`);
});
