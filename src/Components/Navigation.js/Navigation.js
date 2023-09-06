import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { NavLink } from 'react-router-dom';
import "./Navigation.css"

const Navigation = () => {

    const { orderQuantity } = useContext(AppContext);

    const list = [
        {name: "Home", path: "/" },
        {name: "Menu", path: "/menu" },
        {name: `Order ${orderQuantity === 0 ? "" : `(${orderQuantity})`}`, path: "/order" },
        {name: "Admin", path: "/admin" },
    ]

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