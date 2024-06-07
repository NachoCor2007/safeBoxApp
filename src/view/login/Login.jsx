import React, {useEffect, useState} from 'react';
import { Api } from "../../App.js";
import './Login.css';
import axios from "axios";

const Login = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const serverUrl = 'http://3.87.208.75:3001';

    const loginInfo = {
        username: username,
        password: password
    }

    const isLogged = () => {
        let storageIsFilled = sessionStorage.getItem("Casa_Id") != null && sessionStorage.getItem("Usuario_Id") != null;
        setIsAuthenticated(storageIsFilled);
    }

    const handleLoginSubmit = (event) => {
        console.log(loginInfo.password);
        Api.publish('/login', JSON.stringify(loginInfo));
        setUsername('');
        setPassword('');
    };

    const handleNewUserSubmit = (event) => {
        const houseId = sessionStorage.getItem("casa_Id");
        const jsonSent = {username: username, password: password, houseId: houseId};
        Api.publish("register", JSON.stringify(jsonSent));
        setUsername('');
        setPassword('');
    }

    const cancelUserForm = (event) => {
        event.preventDefault()
        setUsername('');
        setPassword('');
    }

    const handleLogout =(event) => {
        // event.preventDefault();
        sessionStorage.clear()
        window.location.reload();
    }

    useEffect(() => {
        isLogged();
        if (isAuthenticated) {return;}
        const intervalId = setInterval(() => {
            axios.get(`${serverUrl}/user_data`)
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200 && response.data !== "") {
                        sessionStorage.setItem("Casa_Id", String(response.data.houseId));
                        sessionStorage.setItem("Usuario_Id", String(response.data.userId));
                        setIsAuthenticated(true);
                        clearInterval(intervalId); // Stop polling once data is received
                        window.location.reload();
                    }
                })
                .catch(error => console.error(error));
        }, 100); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, [isAuthenticated]);


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