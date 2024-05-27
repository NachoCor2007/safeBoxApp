import React, {useState} from 'react';
import './Block.css';

function Block() {
    // const [usersInHouse, setUsersInHouse] = useState({});
    // const [usersToBlock, setUsersToBlock] = useState('');

    return (
        <main className={"blockMain"}>
            <h1>Manage blocked users here.</h1>
            <form className={'formMain'}>
                <label className={'blockUsers'}>
                    <h3>Select users to block: </h3>
                    <input type={"text"}/>
                </label>
                <label>
                    <button>Cancel</button>
                    <button>Apply changes</button>
                </label>
                <label>
                    <button>Block all users</button>
                </label>
                <label>
                    <button>Unblock all users</button>
                </label>
            </form>
        </main>
    );
}

export default Block;
