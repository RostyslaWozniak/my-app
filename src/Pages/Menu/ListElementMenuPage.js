import { useContext, useState } from "react";
import { AppContext } from "../../Components/AppContext";
import Button from "../../Components/elements/Button";




const ListElementMenuPage = ({id, name, price, indx }) => {
    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity} = useContext(AppContext);
    const quantity = getItemQuantity(id)
    return ( 
        <li key={id}>
                <b>{indx + 1}.</b>
                <p>{name}</p>
                <p>{price} zł</p>
                {quantity === 0 ? 
                <div className="button">
                    <Button
                    type="medium"
                    name="dodaj"
                    handleClick={() => increaseItemQuantity(id)}
                    />
                </div>
                
                : 
                <div className="buttons">
                    <Button
                    type="small"
                    name="-"
                    handleClick={() => decreaseItemQuantity(id)}
                    />
                    <p>{quantity}</p>
                    <Button
                    type="small"
                    name="+"
                    handleClick={() => increaseItemQuantity(id)}
                    />
                </div>
                }
        </li>
     );
}
 
export default ListElementMenuPage;