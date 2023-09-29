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
    const { currentUser, registeredUsersMap, setRegisteredUsersMap } = useContext(LoginContext);
    const { 
        handleOrderIsSend,
        menuArray, 
        orderArray, 
        orderQuantity, 
        removeFromOrderArray,
    } = useContext(AppContext);
    let isOrderSended = false;
    if(registeredUsersMap.has(currentUser)){
        isOrderSended = registeredUsersMap.get(currentUser).isOrderSended;
        registeredUsersMap.get(currentUser).orderArray = [...orderArray];
    }
    const item = orderArray.map(el => {
        const item = menuArray.find(it => it.id === el.id);
        const button = <Button
            isDisabled={isOrderSended}
            name="usuń"
            className="medium delete"
            onClick={() => removeFromOrderArray(el.id)}
            />
        return(
        <ListElement
        key={el.id}
        quantity={el.quantity}
        name={item.name}
        price={item.price}
        button={button}
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
                    {registeredUsersMap.get(currentUser).isOrderSended
                    ?
                    <p>Twoje zamówienie jest przyęte</p>
                    :
                    <Button
                    name="zamów "
                    className="large accept"
                    onClick={() => {
                        if(registeredUsersMap.get(currentUser).isOrderSended)return console.log('returned', registeredUsersMap)
                        setRegisteredUsersMap(prevState => registeredUsersMap.set(currentUser, {
                            ...prevState.get(currentUser),
                            isOrderSended: true,
                        }))
                        handleOrderIsSend(currentUser, totalPrice())
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
