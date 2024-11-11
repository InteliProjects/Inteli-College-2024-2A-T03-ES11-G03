// consumer.js
const { getChannel } = require('./connection');

async function consumeMessages(queueName, callback) {
  try {
    const channel = await getChannel();
    await channel.assertQueue(queueName, { durable: true });

    channel.consume(queueName, (msg) => {
      if (msg !== null) {
        console.log(`Received message from ${queueName}: ${msg.content.toString()}`);
        callback(msg.content.toString()); 
        channel.ack(msg); 
      }
    }, { noAck: false });
  } catch (error) {
    console.error('Failed to consume messages from queue', error);
  }
}

module.exports = { consumeMessages };
