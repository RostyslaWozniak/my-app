import React, { useContext } from 'react';

import { AppContext } from '../../Components/AppContext';

import { ListElementOrderPage } from './ListElementOrderPage';

const OrderPge = () => {
    const { orderArray } = useContext(AppContext);
    const item = orderArray.map((el, index) => (
        <ListElementOrderPage
        key={el.id}
        index={index}
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

