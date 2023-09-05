import { useContext, useState } from "react";
import { AppContext } from "../../Components/AppContext";
import Button from "../../Components/elements/Button";




const ListElementMenuPage = ({id, name, price, }) => {
    const { handleAddToOrder, quantity, handleDeleteElementFromOrder } = useContext(AppContext);
    return ( 
        <li key={id}>
                <p>{name}</p>
                <p>{price} zł</p>
                {quantity === 0 ? 
                <Button
                type="medium"
                name="dodaj"
                handleClick={() => handleAddToOrder(id)}/>
                
                : 
                <div className="buttons">
                    <Button
                    type="small"
                    name="-"
                    handleClick={handleDeleteElementFromOrder}/>
                    <p>{quantity}</p>
                    <Button
                    type="small"
                    name="+"
                    handleClick={() => handleAddToOrder(id)}/>
                </div>
                }
        </li>
     );
}
 
export default ListElementMenuPage;