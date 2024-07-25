import { createClient } from '@redis/client';

const client = createClient({
  url: 'redis://default:dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB@redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com:12675'
});

client.on('error', (err) => {
  console.log('Redis error: ', err);
});

client.on('connect', () => {
  console.log('Redis connected');
});

export default client;
