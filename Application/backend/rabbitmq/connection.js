// rabbitmqConnection.js
const amqp = require('amqplib');

let connection;
let channel;

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');

    return channel;
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
    process.exit(1);
  }
}

async function getChannel() {
  if (!channel) {
    await connectRabbitMQ();
  }
  return channel;
}

module.exports = { connectRabbitMQ, getChannel };
