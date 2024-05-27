import React, {useEffect, useState} from 'react';
// import { Api } from "../../App.js";
import './Block.css';

function Block() {
    const [usersInHouse, setUsersInHouse] = useState([]);
    const [usersToBlock, setUsersToBlock] = useState([]);
    const users = [
        {
            username: 'Elon Musk'
        },
        {
            username: 'Jeff Bezos'
        },
        {
            username: 'tu hermana, sape'
        }
    ];

    const cancelForm = async e => {
        e.preventDefault();
        setUsersToBlock([]);
    };

    const submitForm = async e => {
        // e.preventDefault();
        console.log("SAPEEEEE");
    };

    const handleBlockAll = async e => {
        // e.preventDefault();
        setUsersToBlock(usersInHouse);
    };

    const handleUnblockAll = async e => {
        // e.preventDefault();
        setUsersToBlock([]);
    };

    useEffect(() => {
        setUsersInHouse(users);
    }, []);

    // useEffect(() => {
    //     console.log('usersInHouse has been updated: ' + usersInHouse);
    // }, [usersInHouse]);
    //
    // useEffect(() => {
    //     console.log('usersToBlock has been updated: ' + usersToBlock);
    // }, [usersToBlock]);

    return (
        <main className={"blockMain"}>
            <h1>Manage blocked users here.</h1>
            <form className={'formMain'}>
                <label className={'blockUsers'}>
                    <h3>Select users to block: </h3>
                    <div className={"usersDiv"}>
                        {usersInHouse.map((item) => (
                            <div key={item.username} className={"individualUser"} >
                                <input type={"checkbox"}
                                       checked={usersToBlock.includes(item)}
                                       onChange={() => {
                                           if (usersToBlock.includes(item)) {
                                               setUsersToBlock(usersToBlock.filter(t => t !== item));
                                           } else {
                                               setUsersToBlock([...usersToBlock, item]);
                                           }
                                       }}
                                /><label className={"userLabel"}>{item.username}</label>
                            </div>
                        ))}
                    </div>
                </label>

                <label className={"formButtons"} >
                    <button onClick={cancelForm} >Cancel</button>
                    <button onClick={submitForm} >Apply changes</button>
                </label>

                <label className={"extremeButtons"} >
                    <button onClick={handleBlockAll} >Block all users</button>
                    <button onClick={handleUnblockAll} >Unblock all users</button>
                </label>
            </form>
        </main>
    );
}

export default Block;
