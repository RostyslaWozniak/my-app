import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { LoginContext } from '../LoginContext';
import { NavLink } from 'react-router-dom';
import "./Navigation.css"

const Navigation = () => {

    const { orderQuantity, isBurgerNavActive } = useContext(AppContext);
    const { isAdminLogged, currentUser, registeredUsersMap } = useContext(LoginContext); 
    
    let userStatus = false
    if(registeredUsersMap.has(currentUser)){
        userStatus = registeredUsersMap.get(currentUser).isUserLogged
    }
    
    const user = userStatus ? {name: "Logout", path: "/logout"} : {name: "Login", path: "/login"}

    const navNames = [
        {name: "Home", path: "/" },
        {name: "Menu", path: "/menu" },
        {name: `Order ${orderQuantity === 0 ? "" : `(${orderQuantity})`}`, path: "/order" },
        isAdminLogged ? {name: "Admin", path: "/admin"} : user,
    ]
    const activeNavClass = isBurgerNavActive && "active-nav";
    const navigation = navNames.map(el => (
        <li key={el.name}>
            <NavLink to={el.path}>{el.name}</NavLink>
        </li>
    ))
    return ( 
        <div className={`navigation  ${activeNavClass}`}>
            <ul>
                {navigation}
            </ul>
        </div>
     );
}
 
export default Navigation;