import { useContext, useState } from "react";
import { AppContext } from "../../Components/AppContext";
import ListElement from "../../Components/elements/ListElement/ListElement";
import Button from "../../Components/elements/Button/Button";

const AdminInfo = () => {
    const [isOrderDone, setIsOrderDone] = useState(false);
    const { menuArray, sendOrderArray } = useContext(AppContext);
    const buttonDoneClassName = isOrderDone && "accept";
    const buttonsDoneNameChange = isOrderDone ? "X" : "";
    const info = sendOrderArray.map((orderInfo, index) => (
        <div className="admin-info-container" key={index}>
            <h3>{orderInfo.userName}</h3>
            <ul>
                {orderInfo.order.map(orderItem => {
                    const order = menuArray.find(item => item.id === orderItem.id)
                    return <ListElement key={order.id} {...order}/> 
                })}
            </ul>
            <div className="summary-container">
                <p>Złożono o {orderInfo.date}</p>
                <p>Suma: {orderInfo.totalPrice}</p>
                <label htmlFor={index}>
                    Zrealizowano: 
                    <Button
                        id={index}
                        name={buttonsDoneNameChange}
                        className={`small ${buttonDoneClassName}`}
                        onClick={() => setIsOrderDone(prev => !prev)}
                    />
                </label>
            </div>
        </div>
    ));
    return (    
        sendOrderArray.length === 0
        ? 
            <h2>Brak Zamówień</h2>
        :
        <>
            <h2>Wszystkie zamówienia</h2>
            {info}
        </>   
    );
}
 
export default AdminInfo;