import React, {useEffect, useState} from 'react';
import { Api } from "../../App.js";
import './Login.css';
import axios from "axios";

const Login = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const serverUrl = 'http://3.83.191.143:3001';

    const loginInfo = {
        username: username,
        password: password
    }

    const isLogged = () => {
        let storageIsFilled = sessionStorage.getItem("Casa_Id") != null && sessionStorage.getItem("Usuario_Id") != null;
        setIsAuthenticated(storageIsFilled);
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        console.log(loginInfo.password);
        if (isAuthenticated) {return;}

        // Wrap the publish call in a Promise
        await new Promise(resolve => {
            Api.publish('/login', JSON.stringify(loginInfo));
            setTimeout(resolve, 1000); // Wait for 1 second before resolving the Promise
        });

        axios.get(`${serverUrl}/user_data`)
            .then(response => {
                console.log(response.data);
                if (response.status === 200 && response.data !== "") {
                    sessionStorage.setItem("Casa_Id", String(response.data.houseId));
                    sessionStorage.setItem("Usuario_Id", String(response.data.userId));
                    setIsAuthenticated(true);
                    window.location.reload();
                }
            })
            .catch(e => (console.log(e)));
    };

    const handleNewUserSubmit = (event) => {
        event.preventDefault();
        const houseId = sessionStorage.getItem("Casa_Id");
        const jsonSent = {...loginInfo, houseId: houseId};
        console.log(jsonSent);
        Api.publish("/register", JSON.stringify(jsonSent));
    }

    const cancelUserForm = () => {
        setUsername('');
        setPassword('');
    }

    const handleLogout =() => {
        // event.preventDefault();
        console.log("Logging out");
        sessionStorage.clear();
        window.location.reload();
    }

    useEffect(() => {
        isLogged();
    }, []);


    return (
        <main className={"userViewMain"}>
            <form onSubmit={isAuthenticated ? handleNewUserSubmit : handleLoginSubmit}>
                <h1>{isAuthenticated ? "Register user" : "Login"}</h1>
                <input type="text" placeholder="Username" defaultValue={username}
                       onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" defaultValue={password}
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