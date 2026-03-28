import mongoose from 'mongoose';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const uri =
      process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'
        ? process.env.DEV_URI
        : process.env.PROD_URI;

    cached.promise = mongoose.connect(uri!).then((mongoose) => {
      console.log('✅ Connected to MongoDB');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export const dbDisconnect = async () => {
  await mongoose.disconnect();
  console.log('✅ Disconnected from MongoDB');
};
