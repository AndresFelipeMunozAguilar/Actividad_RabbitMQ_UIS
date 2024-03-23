// receive.js
const amqp = require('amqplib');

async function receiveMessage() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'receive_queue';

        await channel.assertQueue(queue);
        console.log('Esperando mensajes...');

        channel.consume(queue, (message) => {
            console.log('Mensaje recibido:', message.content.toString());
        }, { noAck: false });

    } catch (error) {
        console.error('Error al recibir el mensaje:', error);
    }
}

receiveMessage();

