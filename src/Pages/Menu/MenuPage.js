import React, { useContext, useRef } from 'react';
import Button from '../../Components/elements/Button/Button';
import ListElement from '../../Components/elements/ListElement/ListElement';
import { AppContext } from '../../Components/AppContext';
import './MenuPage.css'

const MenuPage = () => {
    const lunchRef = useRef(null);
    const saladsRef = useRef(null);
    const dessertsRef = useRef(null);
    const drinksRef = useRef(null);
    const { menuArray } = useContext(AppContext);    
    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity} = useContext(AppContext);
        const item = menuArray.map(el => {
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
            name={el.name}
            price={el.price}
            ingredients={el.ingredients}
            category={el.category}
            button={buttons}
            />
        )})
        const lunch = item.filter(el => el.props.category === "obiady");
        const salads = item.filter(el => el.props.category === "sałatki");
        const desserts = item.filter(el => el.props.category === "desery");
        const drinks = item.filter(el => el.props.category === "napoje");
        
        const handleScroll = (ref) => {
            ref.current?.scrollIntoView({behavior: 'smooth'})
        }
    return ( 
        <div className="menu-container">
            <h1>Menu</h1>
            <div className="menu-buttons">
                <Button 
                name="Obiady"
                type="Xlarge"
                handleClick={() => handleScroll(lunchRef)}
                />  
                <Button 
                name="sałatki"
                type="Xlarge"
                handleClick={() => handleScroll(saladsRef)}
                />  
                <Button 
                name="desery"
                type="Xlarge"
                handleClick={() => handleScroll(dessertsRef)}
                />  
                <Button 
                name="napoje"
                type="Xlarge"
                handleClick={() => handleScroll(drinksRef)}
                />  
            </div>
            
            <ul>
                <h2 ref={lunchRef} >Obiady</h2>
                {lunch}
                <h2 ref={saladsRef}>Sałątki</h2>
                {salads}
                <h2 ref={dessertsRef}>Desery</h2>
                {desserts}
                <h2 ref={drinksRef}>Napoje</h2>
                {drinks}
            </ul>
        </div>
     );
}
 
export default MenuPage;