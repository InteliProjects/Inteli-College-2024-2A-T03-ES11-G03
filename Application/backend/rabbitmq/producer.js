// producer.js
const { getChannel } = require('./connection');

async function sendMessageToQueue(queueName, message) {
  try {
    const channel = await getChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });
    console.log(`Message sent to queue ${queueName}: ${message}`);
  } catch (error) {
    console.error('Failed to send message to queue', error);
  }
}

module.exports = { sendMessageToQueue };
