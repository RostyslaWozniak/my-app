import { useContext, useState } from "react";
import { AppContext } from "../../Components/AppContext";
import Button from "../../Components/elements/Button";
import { formatCurency } from "../../tools/formatCurency";



const ListElementMenuPage = ({id, name, price, indx }) => {
    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity} = useContext(AppContext);
    const quantity = getItemQuantity(id)
    const nr = `${indx + 1}.`
    return ( 
        <li key={id}>
                <b>{nr}</b>
                <p>{name}</p>
                <p>{formatCurency(price)}</p>
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
                    type="small delete"
                    name="-"
                    handleClick={() => decreaseItemQuantity(id)}
                    />
                    <p>{quantity}</p>
                    <Button
                    isDisabled={quantity >= 5 ? true : false}
                    type="small accept"
                    name="+"
                    handleClick={() => increaseItemQuantity(id)}
                    />
                </div>
                }
        </li>
     );
}
 
export default ListElementMenuPage;