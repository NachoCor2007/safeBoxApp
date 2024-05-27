import React, {useEffect, useState} from 'react';
import './Limit.css';

function Limit() {
    const [moneyLimit, setMoneyLimit] = useState('');

    const cancelForm = async e => {
        e.preventDefault();
        setMoneyLimit('');
    };

    const submitForm = async e => {
        e.preventDefault();
        console.log("SAPEEEEEE");
    };

    useEffect(() => {
        console.log('MoneyLimit updated : ' + moneyLimit);
    }, [moneyLimit]);

    return (
        <main className={"limitMain"}>
            <h1>Manage money limits here.</h1>
            <form className={'formMain'}>
                <label className={'moneyLimit'}>
                    <h3>Set extraction limit: </h3>
                    <input
                        type="number"
                        name="newMoneyLimit"
                        value={moneyLimit}
                        onChange={(e) => setMoneyLimit(e.target.value)}
                    />

                </label>
                <label className={"formButtons"}>
                    <button onClick={cancelForm} >Cancel</button>
                    <button onClick={submitForm} >Change limit</button>
                </label>
                <label className={"extremeButtons"} >
                    <button>Delete previous extraction limit</button>
                </label>
            </form>
        </main>
    );
}

export default Limit;
