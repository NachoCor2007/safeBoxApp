// server.js

const express = require('express');
const mqtt = require('mqtt');
const cors = require('cors');


const app = express();
app.use(cors());

const server = mqtt.connect('mqtt://44.201.159.150');

server.on('connect', () => {
    console.log('Connected to MQTT broker');
    server.subscribe("/user_data", (err) => {
        if (!err) {
            console.log('Successfully subscribed to /user_data');
        } else {
            console.error('Failed to subscribe to /user_data:', err);
        }
    });
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

// server.js

let userData = null;

server.on('message', (topic, message) => {
    if (topic === "/user_data") {
        console.log(String(message));
        userData = JSON.parse(String(message));
        userData = "";
    }
});

app.get('/user_data', (req, res) => {
    if (userData) {
        res.json(userData);
    } else {
        res.status(404).send('No user data available');
    }
});