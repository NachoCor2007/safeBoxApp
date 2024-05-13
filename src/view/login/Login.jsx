import Api from "../api/Api";
import React, {useState, useEffect} from 'react';
import mqtt from "mqtt";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [client, setClient] = useState(null);

    useEffect(() => {
        const mqttClient = mqtt.connect('mqtt://54.144.238.1:1883');
        mqttClient.on('connect', () => {
            console.log('Client connected');
        });
        mqttClient.on('error', (error) => {
            console.log('Connection error:', error);
        });
        setClient(mqttClient);
    }, []);

    const message = {
        username: username,
        password: password
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(client) {
            Api.publish('/login', JSON.stringify(message), client);
            console.log(JSON.stringify(message));
        } else {
            console.log('Client is not connected');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;