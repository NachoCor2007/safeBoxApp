import React, {useEffect, useState} from 'react';
// import { Api } from "../../App.js";
import './Block.css';
import axios from "axios";
import {Api} from "../../App";

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

function Block() {
    const houseId = sessionStorage.getItem("Casa_Id");
    const [usersInHouse, setUsersInHouse] = useState([]);
    const [usersToBlock, setUsersToBlock] = useState([]);
    const serverUrl = 'http://3.87.208.75:3001';

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
        console.log("SAPEEEEE");
    };

    const handleUnblockAll = async () => {
        // e.preventDefault();
        setUsersToBlock([]);
        console.log("SAPEEEEE");
    };

    useEffect(() => {
        async function fetchData() {
            await new Promise(resolve => {
                Api.publish("/house_users", JSON.stringify({houseId: houseId}));
                setTimeout(resolve, 1000); // Wait for 1 second before resolving the Promise
            });
            axios.get(`${serverUrl}/users_list`)
                .then(response => {
                    console.log(response.data);
                    console.log("Status is " + response.status);
                    console.log("Data length is " + response.data.length);
                    if (response.status === 200 && response.data.length !== 0) {
                        console.log("Subimos datos a usersInHouse papu");
                        setUsersInHouse(response.data);
                    }
                    else {
                        console.log("No se metio adentro XD");
                    }
                }).catch(e => (console.log(e)));
        }
        fetchData();
    }, []);

    useEffect(() => {
        console.log("usersInHouse has been updated:");
        console.log(usersInHouse);
    }, [usersInHouse]);

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
                        {usersInHouse.length !== 0 ?
                            usersInHouse.forEach((item) => (
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
                            ))
                            :
                            null
                        }
                    </div>
                </div>

                <div className={"formButtons"}>
                    <button className={"cancelButton"} onClick={cancelForm}>Cancel</button>
                    <button className={'submitButton'} onClick={submitForm}>Apply changes</button>
                </div>

                <div className={"extremeButtons"}>
                    <button className={"blockAllButton"} onClick={handleBlockAll}>Block all users</button>
                    <button className={"unblockAllButton"} onClick={handleUnblockAll}>Unblock all users</button>
                </div>
            </form>
        </main>
    );
}

export default Block;
