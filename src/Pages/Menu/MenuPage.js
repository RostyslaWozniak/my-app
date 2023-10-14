import React, { useContext, useEffect, useRef } from 'react';
import Button from '../../Components/elements/Button/Button';
import ListElement from '../../Components/elements/ListElement/ListElement';
import { AppContext } from '../../Context/AppContext';
import './MenuPage.css'

const MenuPage = () => {
    useEffect(() => {
        window.scrollTo({
            top: 150,
            behavior: "smooth",
        })
    }, []);
    const { 
        currentUser, 
        menuArray,  
        getItemQuantity, 
        increaseItemQuantity, 
        decreaseItemQuantity,
    } = useContext(AppContext);
 //handle scroll
    const lunchRef = useRef(null);
    const saladsRef = useRef(null);
    const dessertsRef = useRef(null);
    const drinksRef = useRef(null); 
 //check is user logged and get status of order
    const isOrderSended = currentUser?.isOrderSended || false;

    const item = menuArray.map(el => {
     //get quantity of order items in cart
        const quantity = getItemQuantity(el.id);
     // show button add if quantity 0 or buttons "+" and "-"
        const buttons = quantity === 0 
            ? 
            <div className="buttons">
                <Button
                className="medium"
                name="dodaj"
                onClick={() => increaseItemQuantity(el.id)}
                />
            </div>
            : 
            <div className="buttons">
                <Button
                className="small delete"
                name="-"
                onClick={() => decreaseItemQuantity(el.id)}
                />
                <p>{quantity}</p>
                <Button
                isDisabled={quantity >= 5 ? true : false}
                className="small accept"
                name="+"
                onClick={() => increaseItemQuantity(el.id)}
                />
            </div>
        return(
            <ListElement
                key={el.id}
                button={!isOrderSended && buttons}
                {...el}
            />
        )
    });
 //handle scroll
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
                className="Xlarge"
                onClick={() => handleScroll(lunchRef)}
                />  
                <Button 
                name="sałatki"
                className="Xlarge"
                onClick={() => handleScroll(saladsRef)}
                />  
                <Button 
                name="desery"
                className="Xlarge"
                onClick={() => handleScroll(dessertsRef)}
                />  
                <Button 
                name="napoje"
                className="Xlarge"
                onClick={() => handleScroll(drinksRef)}
                />  
            </div>
            
            <ul>
                <h2 ref={lunchRef} >Obiady</h2>
                {lunch}
                <h2 ref={saladsRef}>Sałatki</h2>
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