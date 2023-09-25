import React, { useContext } from 'react';
import Button from '../../Components/elements/Button/Button';
import ListElement from '../../Components/elements/ListElement/ListElement';
import { AppContext } from '../../Components/AppContext';
import './MenuPage.css'

const MenuPage = () => {
    const { menuArray } = useContext(AppContext);    
    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity} = useContext(AppContext);
        const item = menuArray.map((el, indx) => {
            const quantity = getItemQuantity(el.id);
            const buttons = quantity === 0 ? 
        <div className="button">
            <Button
            type="medium"
            name="dodaj"
            handleClick={() => increaseItemQuantity(el.id)}
            />
        </div>
    : 
        <div className="buttons">
            <Button
            type="small delete"
            name="-"
            handleClick={() => decreaseItemQuantity(el.id)}
            />
            <p>{quantity}</p>
            <Button
            isDisabled={quantity >= 5 ? true : false}
            type="small accept"
            name="+"
            handleClick={() => increaseItemQuantity(el.id)}
            />
        </div>
            return(
            <ListElement
            key={el.id}
            indx={indx}
            name={el.name}
            price={el.price}
            ingredients={el.ingredients}
            button={buttons}
            />
        )})
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