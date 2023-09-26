import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';
import './BurgerNav.css'

const BurgerNav = () => {
    const { setIsBurgerNavActive, isBurgerNavActive } = useContext(AppContext);
    const handleBurgerNav = () => {
        setIsBurgerNavActive(!isBurgerNavActive);
    } 
    const activeNavClass = isBurgerNavActive && "burger-nav-active";
    return ( 
        <div onClick={handleBurgerNav} className={`burger-nav  ${activeNavClass}`}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        
     );
}
 
export default BurgerNav;