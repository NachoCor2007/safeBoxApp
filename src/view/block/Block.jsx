import React, {useEffect, useState} from 'react';
import './Block.css';
import axios from "axios";
import {Api} from "../../App";

function Block() {
    const houseId = sessionStorage.getItem("Casa_Id");
    const [usersInHouse, setUsersInHouse] = useState([]);
    const [usersToSend, setUsersToSend] = useState([]);

    const serverUrl = 'http://54.147.172.120:3001';

    const handleCheckboxChange = (username) => {
        const users = usersToSend.map((item) => {
            if (item.username === username) {
                return {...item, isBlocked: !item.isBlocked};
            } else {
                return item;
            }
        });
        setUsersToSend(users);
    };

    const cancelForm = async (e) => {
        e.preventDefault();
        console.log("Cancelling form.");
        setUsersToSend(usersInHouse);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        console.log("Submitting form.");
        let toSend = JSON.stringify(usersToSend);
        Api.publish("/blockState", toSend);
    };

    const handleBlockAll = async (e) => {
        e.preventDefault();
        console.log("Blocking all users, seip.");
        setUsersToSend(changeBlockStatusAll(usersToSend, true));
    };

    const handleUnblockAll = async (e) => {
        e.preventDefault();
        console.log("Unblocking all users, seip.");
        setUsersToSend(changeBlockStatusAll(usersToSend, false));
    };

    useEffect(() => {
        async function fetchData() {
            await new Promise(resolve => {
                let message = {
                    houseId: houseId
                }
                console.log(message);
                Api.publish("/house_users", message);
                setTimeout(resolve, 2000); // Wait for 1 second before resolving the Promise
            });
            axios.get(`${serverUrl}/users_list`)
                .then(response => {
                    console.log(response.data);
                    console.log("Status is " + response.status);
                    console.log("Data length is " + response.data.length);
                    if (response.status === 200 && response.data.length !== 0) {
                        console.log("Subimos datos a usersInHouse papu");
                        setUsersInHouse(response.data);
                        setUsersToSend(response.data);
                    }
                    else {
                        console.log("No se metio adentro XD");
                    }
                }).catch(e => (console.log(e)));
        }
        fetchData();
    }, []);

    useEffect(() => {
        console.log("Got house id: " + houseId);
    }, [houseId]);

    useEffect(() => {
        console.log('usersInHouse has been updated: ');
        console.log(usersInHouse);
    }, [usersInHouse]);

    useEffect(() => {
        console.log('usersToSend has been updated:');
        console.log(usersToSend);
    }, [usersToSend]);

    return (
        <main className={"blockMain"}>
            <h1>Manage blocked users here.</h1>
            <form className={'formMain'}>
                <div className={'blockUsers'}>
                    <h3>Select users to block: </h3>
                    <div className={"usersDiv"}>
                        {usersToSend.length !== 0 ?
                            usersToSend.map((item) => (
                                <label key={item.userId} className={"individualUser"} >
                                    <input type={"checkbox"}
                                           checked={item.isBlocked}
                                           onChange={() => handleCheckboxChange(item.username)}
                                    />{item.username}
                                </label>
                            ))
                            :
                            null
                        }
                    </div>
                </div>

                <div className={"extremeButtons"}>
                    <button className={"blockAllButton"} onClick={handleBlockAll}>Block all users</button>
                    <button className={"unblockAllButton"} onClick={handleUnblockAll}>Unblock all users</button>
                </div>

                <div className={"formButtons"}>
                    <button className={"cancelButton"} onClick={cancelForm}>Cancel</button>
                    <button className={'submitButton'} onClick={submitForm}>Apply changes</button>
                </div>
            </form>
        </main>
    )
}

function changeBlockStatusAll(users, blockStatus) {
    return users.map((user) => {
        return {...user, isBlocked: blockStatus};
    });
}

export default Block;
