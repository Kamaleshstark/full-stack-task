import express from 'express';
import bodyParser from 'body-parser';
import mqttClient from './mqttClient';
import redisClient from './redisClient';
import mongoCollection from './mongoClient';

const app = express();
app.use(bodyParser.json());

const TASK_KEY = 'FULLSTACK_TASK_<YOUR_FIRST_NAME>';

mqttClient.on('message', async (topic, message) => {
  if (topic === '/add') {
    const task = message.toString();
    try {
      const reply = await redisClient.lPush(TASK_KEY, task);
      console.log(`Task added to Redis with reply: ${reply}`);
      if (reply > 50) {
        const tasks = await redisClient.lRange(TASK_KEY, 0, -1);
        await redisClient.del(TASK_KEY);
        await mongoCollection.insertMany(tasks.map(task => ({ task })));
        console.log('Moved tasks to MongoDB');
      }
    } catch (err) {
      console.error('Redis error:', err);
    }
  }
});

app.get('/fetchAllTasks', async (req, res) => {
  try {
    const tasks = await redisClient.lRange(TASK_KEY, 0, -1);
    if (tasks.length === 0) {
      const mongoTasks = await mongoCollection.find().toArray();
      res.json(mongoTasks.map(doc => doc.task));
    } else {
      res.json(tasks);
    }
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
