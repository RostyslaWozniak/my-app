import React, { useContext } from 'react';
import {formatCurency} from '../../tools/formatCurency'
import { AppContext } from '../../Components/AppContext';

import { ListElementOrderPage } from './ListElementOrderPage';
import Button from '../../Components/elements/Button';
import './Order.css'

const OrderPge = () => {
    const { orderArray, orderQuantity, handleOrederIsSend, menuArray } = useContext(AppContext);
    const item = orderArray.map((el, indx) => (
        <ListElementOrderPage
        key={el.id}
        indx={indx}
        {...el}
        />
    ))  
    
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
            <h1>Twoje zamówienie {orderQuantity === 0 ? "" : `(${orderQuantity})`}</h1>
            <ul>
                {orderQuantity === 0 ? <h3>Brak zamówionych dań :(</h3> : item}               
            </ul>
            <div className="order-sum">
                {orderQuantity === 0 ? null :
                <div className="result-container">
                    <b>Do zapłaty: {totalPrice()}</b>
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

