import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';

import { errorHandler } from '@/middlewares/error.middleware';
import { router } from '@/routers';
import { connectMongoDB } from '@/utils/database.util';
import { ejsFileLoader } from '@/utils/library.util';

const app = express();

connectMongoDB();

ejsFileLoader();

app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());
app.use(cors());

app.use('/api', router);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on the port ${port}`);
});
