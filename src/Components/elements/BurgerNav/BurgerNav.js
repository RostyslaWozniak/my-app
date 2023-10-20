import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../Context/AppContext';
import './BurgerNav.css'

const BurgerNav = () => {
    const { setIsBurgerNavActive, isBurgerNavActive } = useContext(AppContext);
    const handleBurgerNav = () => {
        setIsBurgerNavActive(!isBurgerNavActive);
    } 
   
    const isNavVisible = () => {

        if(isBurgerNavActive) return "burger-nav-active";
        return "";
    }
    
    return ( 
        <div 
           
            onClick={handleBurgerNav} 
            className={`burger-nav  ${isNavVisible()}`}
        >
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
 
export default BurgerNav;