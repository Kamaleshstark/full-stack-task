import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://assignment_user:HCgEj5zv8Hxwa4xO@test-cluster.6f94f5o.mongodb.net/';
const client = new MongoClient(url);

async function connect() {
  try {
    await client.connect();
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error: ', err);
  }
}

connect();

export default client.db('assignment').collection('assignment_<your_first_name>');
