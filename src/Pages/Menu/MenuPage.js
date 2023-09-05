import React, { useContext } from 'react';

import { AppContext } from '../../Components/AppContext';

import Button from '../../Components/elements/Button';

import './MenuPage.css'

const MenuPage = () => {

    const { menuArray, handleAddToOrder, orderArray, isArticleOrdered } = useContext(AppContext);       
        const buttons = (
            <div >
                <Button
                name="+"
                type="small"
                />
                {orderArray.length}
                <Button
                name="-"
                type="small"
                />
            </div>

        )
        
        const item = menuArray.map(el => (
            <li key={el.id}>
                <p>{el.name}</p>
                <p>{el.price} zł</p>
                {isArticleOrdered
                ?  buttons
                :  <Button 
                name="dodaj"
                type="medium"
                handleClick={() => handleAddToOrder(el.id)}
            />}
            </li>
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