import mqtt from 'mqtt';

const publish = (topic, message, client) => {
    client.publish(topic, message);
};

const subscribe = (topic, callback, client) => {
    client.on('message', (topic, message) => {
        callback(topic, message.toString());
    });
};

const Api = { publish, subscribe };

export default Api;