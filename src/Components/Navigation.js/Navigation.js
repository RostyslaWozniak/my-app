import React from 'react';
import { NavLink } from 'react-router-dom';

const list = [
    {name: "Home", path: "/" },
    {name: "Menu", path: "/menu" },
    {name: "Zamówinie", path: "/order" },
    {name: "Kontakt", path: "/contact" },
    {name: "Admin", path: "/admin" },
]

const Navigation = () => {
    const navigation = list.map(el => (
        <li key={el.name}>
            <NavLink to={el.path}>{el.name}</NavLink>
        </li>
    ))
    return ( 
        <ul>
            {navigation}
        </ul>
     );
}
 
export default Navigation;