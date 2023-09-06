import React, { useContext } from 'react';

import { AppContext } from '../../Components/AppContext';

import { ListElementOrderPage } from './ListElementOrderPage';

const OrderPge = () => {
    const { orderArray, orderQuantity } = useContext(AppContext);
    const item = orderArray.map((el, index) => (
        <ListElementOrderPage
        key={el.id}
        index={index}
        {...el}
        />
    ))
        
  
    return ( 
        <div className="order-container">
            <h1>Twoje zamówienie {`(${orderQuantity})` || null}</h1>
            <ul>
                {orderQuantity === 0 ? <b>Brak zamówionych dań</b> : item}           
            </ul>
        </div>
     );
}
 
export default OrderPge;

