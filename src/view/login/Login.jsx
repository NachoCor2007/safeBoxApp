import React, {useEffect, useState} from 'react';
import { Api } from "../../App.js";
import './Login.css';
import axios from "axios";

const Login = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const serverUrl = 'http://44.201.159.150:3001';

    const loginInfo = {
        username: username,
        password: password
    }

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        Api.publish('/login', JSON.stringify(loginInfo));
    };

    const handleNewUserSubmit = (event) => {}

    const cancelUserForm = (event) => {
        event.preventDefault()
        setUsername('');
        setPassword('');
    }

    const handleLogout =(event) => {}

    useEffect(() => {
        const intervalId = setInterval(() => {
            axios.get(`${serverUrl}/user_data`)
                .then(response => {
                    if (response.status === 200 && response.data) {
                        sessionStorage.setItem("Casa_Id", String(response.data.houseId));
                        sessionStorage.setItem("Usuario_Id", String(response.data.userId));
                        setIsAuthenticated(true);
                        clearInterval(intervalId); // Stop polling once data is received
                    }
                })
                .catch(error => console.error(error));
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);


    return (
        <main className={"userViewMain"}>
            <form onSubmit={isAuthenticated ? handleNewUserSubmit : handleLoginSubmit}>
                <h1>{isAuthenticated ? "Register user" : "Login"}</h1>
                <input type="text" placeholder="Username"
                       onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password"
                       onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={cancelUserForm}>Cancel</button>
                <button type="submit">Send form</button>
            </form>

            {isAuthenticated ?
                <button onClick={handleLogout}>Logout</button>
                :
                null
            }
        </main>
    );
}

export default Login;