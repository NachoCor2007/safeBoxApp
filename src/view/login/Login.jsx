import React, {useState} from 'react';
import { Api } from "../../App.js";
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginInfo = {
        username: username,
        password: password
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        Api.publish('/login', JSON.stringify(loginInfo));
        Api.subscribe("/user_data")
            .then(data => {
                data = JSON.parse(String(data));
                console.log(data);
                //const Casa_Id = String(data.house_Id);
                const Usuario_Id = String(data.userId);
                //sessionStorage.setItem("Casa_Id", Casa_Id);
                sessionStorage.setItem("Usuario_Id", Usuario_Id);
            })
            .catch(e => console.error(e));
    };

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
