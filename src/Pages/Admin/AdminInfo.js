import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import ListElement from "../../Components/elements/ListElement/ListElement";
import Button from "../../Components/elements/Button/Button";
import axios from "../../tools/axiosTool";

const AdminInfo = () => {
    const { 
        menuArray, 
        sendedOrderToAdmin, 
        setSendedOrderToAdmin, 
        registeredUsersMap,
        setCurrentUser,
    } = useContext(AppContext);
    const setButtonCompletedOrder = async (id) => {
        //send order data to backend
        try{
            const res = await axios.patch(`/order/${id}`, {
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
            console.log(err.message)
        }
        // send current users data to backend
        try{
            const userName = sendedOrderToAdmin.find(order => order.id === id).userName
            const iserId = registeredUsersMap.get(userName).id;
            const res = await axios.patch(`/user/${iserId}`, {
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
        const id = elementToDelete.map(async el =>{
            try{
                await axios.delete(`/order/${el.id}`)  
                let cloneArray = [...sendedOrderToAdmin];  
                cloneArray = cloneArray.filter(order => order.id !== el.id);   
            setSendedOrderToAdmin(cloneArray);
            }catch(err){
                console.log(err.message)
            }
        });  
    }
    return (    
        !sendedOrderToAdmin.length
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