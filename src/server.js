// server.js

const express = require('express');
const mqtt = require('mqtt');
const cors = require('cors');


const app = express();
app.use(cors());

const server = mqtt.connect('mqtt://44.205.246.142');

server.on('connect', () => {
    console.log('Connected to MQTT broker');
    server.subscribe("/user_data", (err) => {
        if (!err) {
            console.log('Successfully subscribed to /user_data');
        } else {
            console.error('Failed to subscribe to /user_data:', err);
        }
    });
    server.subscribe("/users_list", (err) => {
        if (!err) {
            console.log('Successfully subscribed to /users_list');
        } else {
            console.error('Failed to subscribe to /users_list:', err);
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

let userData = "";
let usersList = [];

server.on('message', (topic, message) => {
    if (topic === "/user_data") {
        console.log(String(message));
        userData = JSON.parse(String(message));
    }
    else if (topic === "/users_list"){
        console.log(String(message));
        usersList = JSON.parse(JSON.parse(String(message)));
    }
});

app.get('/user_data', (req, res) => {
    if (userData.message === "Welcome") {
        if (userData.userId !== "") {
            res.json(userData);
        }
        userData = "";
    } else {
        res.status(404).send(userData.message);
    }
});

app.get('/users_list', (req, res) => {
    if (usersList.length !== 0) {
        res.json(usersList);
        usersList = [];
    } else {
        res.status(404).send('No list of users available');
    }
});