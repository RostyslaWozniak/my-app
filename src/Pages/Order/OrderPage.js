import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/elements/Button/Button';
import ListElement from '../../Components/elements/ListElement/ListElement';
import './Order.css'
import axios from 'axios';
const maxQuantityOrderedItems = 5;
const OrderPage = () => {
    const { 
        currentUser,  
        setModal,
        decreaseItemQuantity,
        getItemQuantity,
        getOrderItemsQuantity, 
        getTotalPrice,
        increaseItemQuantity,
        menuArray, 
        orderArray,
        setCurrentUser, 
    } = useContext(AppContext);
    useEffect(() => {
        window.scrollTo({
            top: 150,
            behavior: "smooth",
        })
        
    }, []);
    const navigate = useNavigate()
 //check is user logged and get status of order
    const isOrderSended = currentUser?.isOrderSended || false; 
 //get quantity of order items in cart
    const orderQuantity = getOrderItemsQuantity();
    const totalPrice = getTotalPrice();
    const item = orderArray.map(el => {
        const quantity = getItemQuantity(el.id);
        const item = menuArray.find(it => it.id === el.id);
        const buttons = 
        <div>
            <div className="buttons">
                <Button
                className="small delete"
                name="-"
                onClick={() => decreaseItemQuantity(el.id)}
                />
                <p>{quantity}</p>
                <Button
                isDisabled={quantity >= maxQuantityOrderedItems ? true : false}
                className="small accept"
                name="+"
                onClick={() => increaseItemQuantity(el.id)}
                />
            </div>
        </div>
       
        return(
        <ListElement
        key={el.id}
        button={!isOrderSended && buttons}
        {...item}
        />
    )})  

    const showResultOrMenuBtn = <div className="order-sum">
        {orderQuantity === 0 
        ?
            <Button
            name="MENU"
            className="large accept"
            onClick={() => navigate('/menu')}
            />
        :
            <div className="result-container">
                <h2>Do zapłaty: {totalPrice}</h2>
                {isOrderSended
                ?   
                <h2>Twoje zamówienie zostało przyęte</h2>
                :
                <Button
                name="zamów "
                className="large accept"
                onClick={() => {
                    handleSendOrder()
                }}
                />
                }  
            </div>
        }
    </div>
// SEND ORDER
    const handleSendOrder = async () => {
        if(currentUser == null){
            return setModal({
                isVisible: true,
                value: "Musisz zalogować się",
                buttons: false,
            });
        };
        //send order to backend
        await axios.post("http://localhost:3001/api/order", {
            userName: currentUser.name,
            order: orderArray, 
            date: new Date().toLocaleTimeString(), 
            isOrderCompleted: false, 
            totalPrice,
        });
        // patch user data on backend
        const id = currentUser.id;
        const res = await axios.patch(`http://localhost:3001/api/user/${id}`, {
            isOrderSended: true,
        });
        setCurrentUser(prev => ({
            ...prev,
            isOrderSended: res.data.isOrderSended,
        }))
        console.log(currentUser);
    }
    return ( 
        <div className="order-container">
            <div>
                <h1>Twoje zamówienie {orderQuantity === 0 ? "" : `(${orderQuantity})`}</h1>
                <ul>
                    {!orderQuantity ? <i>Brak zamówionych dań :(</i> : item}           
                </ul> 
            </div>           
            {showResultOrMenuBtn}
        </div>
    );
}
export default OrderPage;