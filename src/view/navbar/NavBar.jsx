import React from 'react';
import {Link, useLocation} from "react-router-dom";
import './NavBar.css'

function NavBar() {
    const location = useLocation();

    return (
        <nav>
            <Link className={`link ${location.pathname === '/login' ? 'active' : ''}`} to={"/login"}>
                <div>
                    <h2>Login/Logout</h2>
                </div>
            </Link>
            <Link className={`link ${location.pathname === '/block' ? 'active' : ''}`} to={"/block"}>
                <div>
                    <h2>Block users</h2>
                </div>
            </Link>
            <Link className={`link ${location.pathname === '/limit' ? 'active' : ''}`} to={"/limit"}>
                <div>
                    <h2>Limit extractions</h2>
                </div>
            </Link>
        </nav>
    );
}

export default NavBar;
