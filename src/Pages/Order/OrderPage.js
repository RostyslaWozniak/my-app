import React, { useContext } from 'react';

import { AppContext } from '../../Components/AppContext';
import Button from '../../Components/elements/Button';
import { ListElementOrderPage } from './ListElementOrderPage';
const OrderPge = () => {
    const { orderArray } = useContext(AppContext);
    const item = orderArray.map((el, indx) => (
        <ListElementOrderPage
        key={el.id}
        id={el.id}
        name={el.name}
        price={el.price}
        />
    ))
        
  
    return ( 
        <div className="order-container">
            <h1>Twoje zamówienie</h1>
            <ul>
                {item}           
            </ul>
        </div>
     );
}
 
export default OrderPge;

