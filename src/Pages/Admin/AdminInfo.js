import { useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import ListElement from "../../Components/elements/ListElement/ListElement";
import Button from "../../Components/elements/Button/Button";

const AdminInfo = () => {
    useEffect(() => {
        window.scrollTo({
            top: 150,
            behavior: "smooth",
        })
    }, []);
    const { 
        menuArray, 
        registeredUsersMap,
        sendOrderArray, 
        setSendOrderArray, 
        setOrderArray,
        setRegisteredUsersMap
    } = useContext(AppContext);
    const setButtonCompletedOrder = (id, currentUser) => {
        setSendOrderArray(prevState => {
            return prevState.map(el => {
                if(el.id === id){
                    return {...el, isOrderCompleted: !el.isOrderCompleted}
                }else {
                    return el
                }
            });
        });
        setRegisteredUsersMap(prevState => (
            registeredUsersMap.set(currentUser, {
            ...prevState.get(currentUser),
            isOrderSended: false,
            orderArray: [],
        })))
        setOrderArray([]);
    }
    const handleDeleteCompletedOrder = () => {   
        const cloneArray = [...sendOrderArray];       
        setSendOrderArray(cloneArray.filter(el => !el.isOrderCompleted));
    }
    const info = sendOrderArray.map(orderInfo => {
        const { id, userName, order, date, totalPrice, isOrderCompleted } = orderInfo
        return (
        <div className="admin-info-container" key={id}>
            <h3>{userName}</h3>
            <ul>
                {order.map(orderItem => {
                    const orderFromMenu = menuArray.find(item => item.id === orderItem.id)
                    return <ListElement key={orderFromMenu.id} {...orderFromMenu}/> 
                })}
            </ul>
            <div className="summary-container">
                <p>Złożono o {date}</p>
                <p>Suma: {totalPrice}</p>
                <label htmlFor={id}>
                    Zrealizowano: 
                    <Button
                        id={id}
                        name={isOrderCompleted ? "X" : ""}
                        className={`small ${isOrderCompleted && "accept"}`}
                        onClick={() => setButtonCompletedOrder(id, userName)}
                    />
                </label>
            </div>
        </div>
    )});
    return (    
        sendOrderArray.length === 0
        ? 
            <h2>Brak Zamówień</h2>
        :
        <>
            <h2>Wszystkie zamówienia</h2>
            {info}
            <Button
             name="usuń zrealizowane"
             className="large delete"
             onClick={() => handleDeleteCompletedOrder()}
            />
        </>   
    );
}
 
export default AdminInfo;