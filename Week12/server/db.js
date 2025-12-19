import { MongoClient } from 'mongodb';

let db;
export async function connectDB() {
  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect();
  db = client.db();
  console.log('MongoDB Connected');
}

export const getCollection = (name) => db.collection(name);