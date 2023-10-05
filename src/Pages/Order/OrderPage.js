import React, { useContext } from 'react';
import { AppContext } from '../../Components/AppContext';
import { LoginContext } from '../../Components/LoginContext';
import { useNavigate } from 'react-router-dom';
import {formatCurency} from '../../tools/formatCurency'
import Button from '../../Components/elements/Button/Button';
import ListElement from '../../Components/elements/ListElement/ListElement';
import './Order.css'

const OrderPage = () => {
    const navigate = useNavigate()
    const { currentUser, registeredUsersMap, setRegisteredUsersMap, setModal } = useContext(LoginContext);
    const { 
        decreaseItemQuantity,
        getItemQuantity,
        getOrderItemsQuantity, 
        handleOrderIsSend,
        increaseItemQuantity,
        menuArray, 
        orderArray, 
    } = useContext(AppContext);
    
 //check is user logged and get status of order
    let isOrderSended = false;
    if(registeredUsersMap.has(currentUser)){
        isOrderSended = registeredUsersMap.get(currentUser).isOrderSended;
        registeredUsersMap.get(currentUser).orderArray = [...orderArray];
    }
 //get quantity of order items in cart
    const orderQuantity = getOrderItemsQuantity();
    
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
                isDisabled={quantity >= 5 ? true : false}
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
    
    function totalPrice(){
        if(orderQuantity === 0) return;
        const priceOrderArray = orderArray.map(el => {           
            const item = menuArray.find(item => item.id === el.id)
            return item.price
        })
        const totalPrice = priceOrderArray.reduce((acc, price) => acc += price).toFixed(2)
        return formatCurency(totalPrice)
    }
    
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
                <h2>Do zapłaty: {totalPrice()}</h2>
                    {isOrderSended
                    ?
                    <p>Twoje zamówienie jest przyęte</p>
                    :
                    <Button
                    name="zamów "
                    className="large accept"
                    onClick={() => {
                        if(isOrderSended)return console.log('returned', registeredUsersMap)
                        handleOrderIsSend(currentUser, registeredUsersMap, totalPrice(), setModal, setRegisteredUsersMap)
                    }}
                    />
                    }  
            </div>
        }
    </div>
    return ( 
        <div className="order-container">
            <h1>Twoje zamówienie {orderQuantity === 0 ? "" : `(${orderQuantity})`}</h1>
            <ul>
                {!orderQuantity ? <i>Brak zamówionych dań :(</i> : item}           
            </ul>            
            {showResultOrMenuBtn}
        </div>
    );
}
export default OrderPage;
