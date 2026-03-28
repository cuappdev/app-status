import mongoose from 'mongoose';

export const dbConnect = async () => {
  const uri =
    process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'
      ? process.env.DEV_URI
      : process.env.PROD_URI;
  await mongoose.connect(uri!);
  console.log('✅ Connected to MongoDB');
};

export const dbDisconnect = async () => {
  await mongoose.disconnect();
  console.log('✅ Disconnected from MongoDB');
};
