import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
  console.log('MQTT connected');
});

export default client;
