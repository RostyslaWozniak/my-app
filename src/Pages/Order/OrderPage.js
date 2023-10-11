import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../Components/AppContext';
import { LoginContext } from '../../Components/LoginContext';
import { useNavigate } from 'react-router-dom';
import {formatCurency} from '../../tools/formatCurency'
import Button from '../../Components/elements/Button/Button';
import ListElement from '../../Components/elements/ListElement/ListElement';
import './Order.css'
import axios from 'axios';

const OrderPage = () => {
    useEffect(() => {
        window.scrollTo({
            top: 150,
            behavior: "smooth",
        })
    }, []);
    const navigate = useNavigate()
    const { currentUser, registeredUsersMap, setRegisteredUsersMap, setModal } = useContext(LoginContext);
    const { 
        decreaseItemQuantity,
        getItemQuantity,
        getOrderItemsQuantity, 
        setSendOrderArray,
        increaseItemQuantity,
        menuArray, 
        orderArray, 
    } = useContext(AppContext);
 //check is user logged and get status of order
    const isOrderSended = registeredUsersMap.get(currentUser)?.isOrderSended || false;
    // registeredUsersMap.get(currentUser).orderArray = [...orderArray];
  
       

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
                <h2>Twoje zamówienie zostało przyęte</h2>
                :
                <Button
                name="zamów "
                className="large accept"
                onClick={() => {
                    handleOrderIsSend()
                }}
                />
                }  
            </div>
        }
    </div>
    // SEND ORDER
    const handleOrderIsSend = async () => {
        if(!registeredUsersMap.has(currentUser)) {
            return (setModal({
                isVisible: true,
                value: "Musisz zalogować się",
                buttons: false,
            }))
            
        } 
        //Send order to backend
        const id = registeredUsersMap.get(currentUser).id;
            // update descriptions on backand
            const res = await axios.put(`http://localhost:3001/api/user/${id}`, {
                descriptions: {
                    orderArray,
                    isOrderSended: true,
                }
            });
            const { name, descriptions, _id} = res.data
            setRegisteredUsersMap(registeredUsersMap.set(
                name, {
                    id: _id,
                    password: descriptions.password,
                    isUserLogged: descriptions.isUserLogged,
                    orderArray: descriptions.orderArray,
                    isOrderSended: descriptions.isOrderSended,
                }));
                console.log(registeredUsersMap)
///////////////////////////////////////
       
            setModal(({
                isVisible: true,
                value: `${currentUser}, twoje zamówienie zostało przyjęte`,
                buttons: false,
            }))
            // const id = new Date().toString();
            const cloneArr = [...orderArray];
            const date = new Date().toLocaleTimeString();
            setSendOrderArray(prevState => ( [...prevState, { id, isOrderCompleted: false, currentUser, totalPrice, date, order: [...cloneArr] }]));
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
