// import React, {useEffect, useState} from 'react';
import React, {useState} from 'react';
// import { Api } from "../../App.js";
import './Block.css';

function Block() {
    // const [usersInHouse, setUsersInHouse] = useState([]);
    const usersInHouse = [
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
    const [usersToBlock, setUsersToBlock] = useState([]);
    // const users = [
    //     {
    //         username: 'Elon Musk'
    //     },
    //     {
    //         username: 'Jeff Bezos'
    //     },
    //     {
    //         username: 'tu hermana, sape'
    //     }
    // ];

    const cancelForm = async e => {
        e.preventDefault();
        setUsersToBlock([]);
    };

    const submitForm = async () => {
        // e.preventDefault();
        console.log("SAPEEEEE");
    };

    const handleBlockAll = async () => {
        // e.preventDefault();
        setUsersToBlock(usersInHouse);
    };

    const handleUnblockAll = async () => {
        // e.preventDefault();
        setUsersToBlock([]);
    };

    // useEffect(() => {
    //     setUsersInHouse(users);
    // }, []);

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
                <div className={'blockUsers'}>
                    <h3>Select users to block: </h3>
                    <div className={"usersDiv"}>
                        {usersInHouse.map((item) => (
                            <label key={item.username} className={"individualUser"} >
                                <input type={"checkbox"}
                                       checked={usersToBlock.includes(item)}
                                       onChange={() => {
                                           if (usersToBlock.includes(item)) {
                                               setUsersToBlock(usersToBlock.filter(t => t !== item));
                                           } else {
                                               setUsersToBlock([...usersToBlock, item]);
                                           }
                                       }}
                                />{item.username}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={"formButtons"}>
                    <button onClick={cancelForm}>Cancel</button>
                    <button onClick={submitForm}>Apply changes</button>
                </div>

                <div className={"extremeButtons"}>
                    <button onClick={handleBlockAll}>Block all users</button>
                    <button onClick={handleUnblockAll}>Unblock all users</button>
                </div>
            </form>
        </main>
    );
}

export default Block;
