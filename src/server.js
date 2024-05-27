// server.js

const express = require('express');
const mqtt = require('mqtt');
const cors = require('cors');

const app = express();
app.use(cors());

const server = mqtt.connect('mqtt://localhost');

server.on('connect', () => {
    console.log('Connected to MQTT broker');
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
});

server.on('error', (err) => {
    console.error('Connection error: ', err);
});

app.post('/publish', express.json(), (req, res) => {
    const { topic, message } = req.body;
    console.log(message);
    server.publish(topic, JSON.stringify(message));
    res.sendStatus(200);
});

app.get('/subscribe/:topic', (req, res) => {
    const { topic } = req.params;
    server.subscribe(topic);
    server.on('message', (topic, message) => {
        res.send(message.toString());
    });
});