import { useNavigate } from "react-router-dom";
import "./Cart.css"
import { AppContext } from "../../../Context/AppContext";
import { useContext } from "react";
const Cart = () => {
    const { getOrderItemsQuantity } = useContext(AppContext);

    const navigate = useNavigate();
    const quantity = getOrderItemsQuantity();
    
    return ( 
        quantity > 0 
        ? 
        <div className="cart" onClick={() => navigate("/order")}>
            <p>{quantity}</p>
        </div>
        :
        null
     );
}
 
export default Cart;