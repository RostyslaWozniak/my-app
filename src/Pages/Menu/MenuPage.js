import React, { useState } from 'react';

import Button from '../../Components/elements/Button';

import './MenuPage.css'

const articles = [
    {id: 1, name: "pierogi", price: 15.99, ingredients: "Z ziemniakami"},
    {id: 2, name: "barszcz", price: 15.99, ingredients: "Z burakami"},
    {id: 3, name: "mizeria", price: 15.99, ingredients: "Z ogórków"},
    {id: 4, name: "schabowy", price: 15.99, ingredients: "Z ziemniakami"},
    {id: 5, name: "ryż", price: 15.99, ingredients: "Z kurczkiem"},
    {id: 6, name: "lody", price: 15.99, ingredients: "z chekoladą"},
    {id: 7, name: "sok", price: 15.99, ingredients: "pomaranczowy"},
]

const MenuPage = () => {
    
    const item = articles.map(el => (
        <li key={el.id}>
            <p>{el.name}</p>
            <p>{el.price} zł</p>
            <Button 
                name="dodaj"
                type="medium"
            /> 
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