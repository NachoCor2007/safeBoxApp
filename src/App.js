import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import NavBar from "./view/navbar/NavBar";
import Home from "./view/home/Home"
import Login from "./view/login/Login";
import Block from "./view/block/Block";
import Limit from "./view/limit/Limit";
import axios from 'axios';

const serverUrl = 'http://3.87.208.75:3001';

export const Api = {

    publish: (topic, message) => {
        axios.post(`${serverUrl}/publish`, { topic, message })
            .then(r => console.log(r.data))
            .catch(e => console.error(e));
    }
};

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar className={"navbar"}/>
                <Routes>
                    <Route path={'/'} element={<Home/>} />
                    <Route path={"/login"} element={<Login className={"login"}/>} />
                    <Route path={"/block"} element={<Block className={"block"}/>} />
                    <Route path={"/limit"} element={<Limit className={"limit"}/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
