import React from 'react';
import './Limit.css';

function Limit() {
    return (
        <main className={"limitMain"}>
            <h1>Manage money limits here.</h1>
            <form className={'formMain'}>
                <label className={'moneyLimit'}>
                    <h3>Set extraction limit: </h3>
                    <input type={"number"}/>
                </label>
                <label>
                    <button>Cancel</button>
                    <button>Change limit</button>
                </label>
                <label>
                    <button>Delete previous extraction limit</button>
                </label>
            </form>
        </main>
    );
}

export default Limit;
