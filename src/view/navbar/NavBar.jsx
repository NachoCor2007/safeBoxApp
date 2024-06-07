import React from 'react';
import {Link, useLocation} from "react-router-dom";
import './NavBar.css'

function NavBar() {
    const location = useLocation();
    const isAllowed = sessionStorage.getItem("Casa_Id") != null && sessionStorage.getItem("Usuario_Id") != null;

    return (
        <nav>
            <Link className={`link ${location.pathname === '/login' ? 'active' : ''}`} to={"/login"}>
                <div>
                    <h2>{isAllowed ? "Add users/Logout" : "Login"}</h2>
                </div>
            </Link>
            {isAllowed ?
                <Link className={`link ${location.pathname === '/block' ? 'active' : ''}`} to={"/block"}>
                    <div>
                        <h2>Block users</h2>
                    </div>
                </Link>
                :
                null
            }
            {isAllowed ?
                <Link className={`link ${location.pathname === '/limit' ? 'active' : ''}`} to={"/limit"}>
                    <div>
                        <h2>Limit extractions</h2>
                    </div>
                </Link>
                :
                null
            }
        </nav>
    );
}

export default NavBar;
