import { useContext } from "react";
import { AppContext } from "../../Components/AppContext";
import ListElement from "../../Components/elements/ListElement/ListElement";
import Button from '../../Components/elements/Button/Button'

const AdminInfo = () => {
    const { menuArray, sendOrderArray } = useContext(AppContext);

    const info = sendOrderArray.map((el, indx) => {
       
        return(
        <div key={indx}>
            <h2>{el.userName}</h2>
            
            <ul>{
                el.order.map(el => {
                    const menuItem = menuArray.find(item => item.id === el.id)
                    return(
                    <>
                        <li key={el.id}>{menuItem.name}: {el.quantity}X</li>
                    </>
                )})}
            </ul>
            <p>{el.totalPrice}</p>
        </div>
    )})
    
       
    return ( 
        <>
            {info}
        </>
     );
}
 
export default AdminInfo;