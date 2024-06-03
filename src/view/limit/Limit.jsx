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

    const handleDeleteLimit = async () => {
        setMoneyLimit('');
        console.log('SAPEEEEEEE');
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
                        defaultValue={moneyLimit}
                        value={moneyLimit}
                        onChange={(e) => setMoneyLimit(e.target.value)}
                    />
                </label>

                <div className={"formButtons"} >
                    <button className={"cancelButton"} onClick={cancelForm} >Cancel</button>
                    <button className={'submitButton'} onClick={submitForm} >Change limit</button>
                </div>

                <div className={"extremeButtons"} >
                    <button className={"deleteLimitButton"} onClick={handleDeleteLimit} >Delete previous extraction limit</button>
                </div>
            </form>
        </main>
    );
}

export default Limit;
