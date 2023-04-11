import { connect } from 'mongoose';

const { MONGODB_HOST, MONGODB_NAME, MONGODB_PORT } = process.env;
if (!MONGODB_HOST || !MONGODB_NAME || !MONGODB_PORT) {
  throw new Error('⛔ Missing mongodb credentials');
}

export const connectMongoDB = async () => {
  try {
    const mongooseConnection = await connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}`, { dbName: MONGODB_NAME });
    console.log(`⚡ MongoDB running on the host ${mongooseConnection.connection.host}`);
  } catch (error) {
    console.log('⛔ MongoDB error:', error);
  }
};
