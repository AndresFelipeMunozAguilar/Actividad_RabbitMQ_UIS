// send.js
const amqp = require('amqplib');

async function sendMessage(message) {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'send_queue';

        await channel.assertQueue(queue);
        await channel.sendToQueue(queue, Buffer.from(message));

        console.log('Mensaje enviado con exito:', message);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
}

sendMessage('Hello RabbitMQ! ¿How are you?');

