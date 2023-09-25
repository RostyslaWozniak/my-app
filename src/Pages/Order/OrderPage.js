import React, { useContext } from 'react';
import { AppContext } from '../../Components/AppContext';
import { useNavigate } from 'react-router-dom';
import {formatCurency} from '../../tools/formatCurency'
import Button from '../../Components/elements/Button/Button';
import ListElement from '../../Components/elements/ListElement/ListElement';
import './Order.css'

const OrderPge = () => {
    const navigate = useNavigate()
    const { orderArray, orderQuantity, handleOrederIsSend, menuArray, removeFromOrderArray } = useContext(AppContext);
    const item = orderArray.map(el => {
        const item = menuArray.find(it => it.id === el.id);
        const button = <Button
            name="usuń"
            type="medium delete"
            handleClick={() => removeFromOrderArray(el.id)}
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
    return ( 
        <div className="order-container">
            <div>
                <h1>Twoje zamówienie {orderQuantity === 0 ? "" : `(${orderQuantity})`}</h1>
                <ul>
                    {orderQuantity !== 0 && item}               
                </ul>
            </div>
            {orderQuantity === 0 && <i>Brak zamówionych dań :(</i>}
            <div className="order-sum">
                {orderQuantity === 0 
                ?
                 <Button
                 handleClick={() => navigate('/menu')}
                 name="MENU "
                 type="large accept"
                 />
                :
                <div className="result-container">
                    <h2>Do zapłaty: {totalPrice()}</h2>
                    <Button
                    handleClick={handleOrederIsSend}
                    name="zamów "
                    type="large accept"
                    />  
                </div>
                }
            </div>
        </div>
    );
}
 
export default OrderPge;

