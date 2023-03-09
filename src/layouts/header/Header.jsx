import React from 'react';
import styles from './styles.module.css'
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <header>
            <nav>
                <ul className={styles.navigation_list}>
                    <NavLink to={'/'}>
                        Home
                    </NavLink>
                    <NavLink to={'/'}>
                        Series
                    </NavLink>
                    <NavLink to={'/'}>
                        TV Show
                    </NavLink>
                </ul>
            </nav>
        </header>
    );
}


export default Header;
