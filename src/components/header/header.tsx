import React from "react";
import { useService } from "../../store";
import { Link } from "react-router-dom";

import './header.scss';

const Header: React.FC = () => {
    const changeService = useService(state => state.changeService);
    const onServiceChange = () => {
        changeService();        
    }

    return (
        <div className="header">
            <h3>
                <Link to="/">Star DB</Link>            
            </h3>
            <ul>
                <li>
                    <Link to="/people">People</Link>
                </li>
                <li>
                    <Link to="/planets">Planets</Link>
                </li>
                <li>
                    <Link to="/starships">Starships</Link>
                </li>
                <li>
                    <Link to="/secret">Secret</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
            <button onClick={onServiceChange}>
                Change Service
            </button>
        </div>
    );
};

export default Header;