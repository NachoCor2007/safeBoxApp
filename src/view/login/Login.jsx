import React, {useEffect, useState} from 'react';
import { Api } from "../../App.js";
import './Login.css';
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const serverUrl = 'http://44.201.159.150:3001';

    const loginInfo = {
        username: username,
        password: password
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        Api.publish('/login', JSON.stringify(loginInfo));
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            axios.get(`${serverUrl}/user_data`)
                .then(response => {
                    if (response.status === 200) {
                        sessionStorage.setItem("Casa_Id", String(response.data.houseId));
                        sessionStorage.setItem("Usuario_Id", String(response.data.userId));
                        clearInterval(intervalId); // Stop polling once data is received
                    }
                })
                .catch(error => console.error(error));
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);


    return (
        <main className={"loginMain"}>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </main>
    );
}

export default Login;