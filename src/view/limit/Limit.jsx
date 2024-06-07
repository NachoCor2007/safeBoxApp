import React, {useState} from 'react';
import { Api } from "../../App.js";
import './Limit.css';

function Limit() {
    const [money, setMoney] = useState('');
    const [moneyLimit, setMoneyLimit] = useState('');
    const houseId = sessionStorage.getItem("Casa_Id");

    const submitMoney = (e) => {
        e.preventDefault();
        Api.publish("/add_money", JSON.stringify({houseId: houseId, amount: money}));
        setMoney('');
    }

    const cancelAdd = (e) => {
        e.preventDefault();
        setMoney("");
    }

    const submitLimit = async e => {
        e.preventDefault();
        Api.publish("/extraction_limit", JSON.stringify({houseId: houseId, amount: moneyLimit}));
        setMoneyLimit('');
        console.log("SAPEEEEEE");
    };

    const cancelLimit = async e => {
        e.preventDefault();
        setMoneyLimit('');
    };

    const handleDeleteLimit = async () => {
        setMoneyLimit('');
        Api.publish("/extraction_limit", JSON.stringify({houseId: houseId, amount: moneyLimit}));
        console.log('SAPEEEEEEE');
    };

    return (
        <main className={"limitMain"}>
            <h1>Manage your money.</h1>

            <form className={'formMain'}>
                <label className={'moneyLimit'}>
                    <h3>Send money to your safe-box: </h3>
                    <input
                        type="number"
                        onChange={(e) => setMoney(e.target.value)}
                    />
                </label>

                <div className={"formButtons"}>
                    <button className={"cancelButton"} onClick={cancelAdd}>Cancel</button>
                    <button className={'submitButton'} onClick={submitMoney}>Change limit</button>
                </div>
            </form>

            <form className={'formMain'}>
                <label className={'moneyLimit'}>
                    <h3>Set extraction limit: </h3>
                    <input
                        type="number"
                        onChange={(e) => setMoneyLimit(e.target.value)}
                    />
                </label>

                <div className={"formButtons"} >
                    <button className={"cancelButton"} onClick={cancelLimit} >Cancel</button>
                    <button className={'submitButton'} onClick={submitLimit} >Change limit</button>
                </div>

                <div className={"extremeButtons"} >
                    <button className={"deleteLimitButton"} onClick={handleDeleteLimit} >Delete previous extraction limit</button>
                </div>
            </form>
        </main>
    );
}

export default Limit;
