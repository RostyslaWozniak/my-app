import React, { useContext } from 'react';

import { AppContext } from '../../Components/AppContext';

import './MenuPage.css'
import ListElementMenuPage from './ListElementMenuPage';

const MenuPage = () => {
    const { menuArray } = useContext(AppContext);    
    
        const item = menuArray.map((el, indx) => (
            <ListElementMenuPage
            key={el.id}
            indx={indx}
            id={el.id}
            name={el.name}
            price={el.price}
            ingredients={el.ingredients}
            />
        ))
    return ( 
        <div className="menu-container">
            <h1>Menu</h1>
            <ul>
                {item}
            </ul>
        </div>
     );
}
 
export default MenuPage;