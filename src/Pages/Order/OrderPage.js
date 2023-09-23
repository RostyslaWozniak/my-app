import React, { useContext } from 'react';
import {formatCurency} from '../../tools/formatCurency'
import { AppContext } from '../../Components/AppContext';
import { useNavigate } from 'react-router-dom';
import { ListElementOrderPage } from './ListElementOrderPage';
import Button from '../../Components/elements/Button';
import './Order.css'

const OrderPge = () => {
    const navigate = useNavigate()
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
            <div>
                <h1>Twoje zamówienie {orderQuantity === 0 ? "" : `(${orderQuantity})`}</h1>
                <ul>
                    {orderQuantity !== 0 && item}               
                </ul>
            </div>
            {orderQuantity === 0 && <i>Brak zamówionych dań :(</i>}
            <div className="order-sum">
                {orderQuantity === 0 ?
                 <Button
                 handleClick={() => navigate('/menu')}
                 name="MENU "
                 type="large accept"
                 />
                 :
                <div className="result-container">
                    <i>Do zapłaty: {totalPrice()}</i>
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

