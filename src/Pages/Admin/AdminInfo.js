import { useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import ListElement from "../../Components/elements/ListElement/ListElement";
import Button from "../../Components/elements/Button/Button";
import axios from "axios";

const AdminInfo = () => {
    useEffect(() => {
        window.scrollTo({
            top: 150,
            behavior: "smooth",
        })
    }, []);
    const { 
        menuArray, 
        sendedOrderToAdmin, 
        setSendedOrderToAdmin, 
        registeredUsersMap,
        setCurrentUser,
        currentUser,
    } = useContext(AppContext);
    const setButtonCompletedOrder = async (id) => {
        //send order data to backend
        try{
            const res = await axios.patch(`http://localhost:3001/api/order/${id}`, {
                isOrderCompleted: true,
            })
         //set data on frontend
            setSendedOrderToAdmin(prevState => {
                return prevState.map(el => {
                    if(el.id === id){
                        return {...el, isOrderCompleted: res.data.isOrderCompleted}
                    }else {
                        return el
                    }
                });
            });
        }catch(err){
            console.log(err)
        }
        // send current users data to backend
        
        try{
                const userName = sendedOrderToAdmin.find(order => order.id === id).userName
                const iserId = registeredUsersMap.get(userName).id;
            const res = await axios.patch(`http://localhost:3001/api/user/${iserId}`, {
            isOrderSended: false,
            order: [],
        });
        const { isOrderSended, order } = res.data;
        setCurrentUser(prev => (
            {...prev, isOrderSended, order,}
        ))
        }catch(err){
            console.log(err);
        }
    }
    
    const info = sendedOrderToAdmin.map(orderInfo => {
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
                        onClick={() => setButtonCompletedOrder(id)}
                    />
                </label>
            </div>
        </div>
    )});
    const handleDeleteCompletedOrder = async () => { 
        const elementToDelete = sendedOrderToAdmin.filter(order => order.isOrderCompleted);
        try{
            const res = await axios.delete(`http://localhost:3001/api/order/${elementToDelete.id}`)  

        }catch(err){
            console.log(err.message)
        }
        const cloneArray = [...sendedOrderToAdmin];       
        setSendedOrderToAdmin(cloneArray.filter(el => !el.isOrderCompleted));
    }
    return (    
        sendedOrderToAdmin.length === 0
        ? 
            <h2>Brak Zamówień</h2>
        :
        <>
            <h2>Wszystkie zamówienia</h2>
            {info}
            <Button
             name="usuń zrealizowane"
             className="large delete"
             onClick={handleDeleteCompletedOrder}
            />
        </>   
    );
}
 
export default AdminInfo;