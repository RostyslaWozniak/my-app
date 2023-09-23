import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';
import './BurgerNav.css'

const BurgerNav = () => {
    const { handleBurgerNav, isBurgerNavActive } = useContext(AppContext);
    const activeNavClass = isBurgerNavActive && "burger-nav-active";
    return ( 
        <div onClick={handleBurgerNav} className={`burger-nav  ${activeNavClass}`}></div>
        
     );
}
 
export default BurgerNav;