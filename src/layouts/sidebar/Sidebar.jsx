import React from 'react';
import {NavLink} from "react-router-dom";
import styles from './styles.module.css';
import {SidebarRoutes} from './constants/sidebar-routes'

// const isActiveClass = ({ isActive }) => (isActive ? styles.active : styles.inactive);

function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <NavLink to={'/'}>
                <span className={styles.logo}>Logo</span>
            </NavLink>
            <ul>
                <span>Menu</span>
                <div className={styles.sidebar_list}>
                    {SidebarRoutes.map(route => {
                        return (
                            <div className={styles.route} key={route.identifier}>
                                {route.icon}
                                <NavLink activeClassName={styles.active} to={route.identifier}>{route.name}
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            </ul>
        </aside>
    );
}

export default Sidebar;
