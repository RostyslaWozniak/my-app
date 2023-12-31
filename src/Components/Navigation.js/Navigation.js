import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import { NavLink } from 'react-router-dom';
import "./Navigation.css"

const Navigation = () => {

    const { 
        currentUser, 
        getOrderItemsQuantity, 
        isAdminLogged, 
        isBurgerNavActive,
        setIsBurgerNavActive,  
    } = useContext(AppContext);

 
    const userStatus = currentUser?.isUserLogged;
    
 //get quantity of order items in cart   
    const orderQuantity = getOrderItemsQuantity();
    const user = userStatus ? {name: "Logout", path: "/logout"} : {name: "Login", path: "/login"}
    const navNames = [
        {name: "Home", path: "/" },
        {name: "Menu", path: "/menu" },
        {name: `Order ${orderQuantity === 0 ? "" : `(${orderQuantity})`}`, path: "/order" },
        isAdminLogged ? {name: "Admin", path: "/admin"} : user,
    ];
    const activeNavClass = isBurgerNavActive && "active-nav";
    const handleCloseMenuBar = () => {
        if(window.innerWidth > 900) return;
        setIsBurgerNavActive(false);
    }
    const navigation = navNames.map(el => (
        <li key={el.name}>
            <NavLink  to={el.path}>{el.name}</NavLink>
        </li>
    ))
    return ( 
        <div className={`navigation  ${activeNavClass}`} onClick={handleCloseMenuBar}>
            <ul>
                {navigation}
            </ul>
        </div>
     );
}
 
export default Navigation;