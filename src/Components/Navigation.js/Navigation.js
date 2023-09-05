import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navigation.css"

const list = [
    {name: "Home", path: "/" },
    {name: "Menu", path: "/menu" },
    {name: "Zamówinie", path: "/order" },
    {name: "Admin", path: "/admin" },
]

const Navigation = () => {
    const navigation = list.map(el => (
        <li key={el.name}>
            <NavLink to={el.path}>{el.name}</NavLink>
        </li>
    ))
    return ( 
        <div className="navigation">
            <ul>
                {navigation}
            </ul>
        </div>
     );
}
 
export default Navigation;