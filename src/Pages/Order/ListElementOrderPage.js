import { useContext } from "react"
import Button from "../../Components/elements/Button"
import { AppContext } from "../../Components/AppContext"
import {formatCurency} from '../../tools/formatCurency'
export const ListElementOrderPage = ({id, quantity, indx}) => {
    const { removeFromOrderArray, menuArray  } = useContext(AppContext)
        const item = menuArray.find(el => el.id === id);
        const nr = `${indx + 1}.`
    return( 
        <li key={id}>
            <b>{nr}</b>
            <p>{item.name} </p>
            <p>x{quantity}</p>
            <p>{formatCurency(item.price)}</p>
            <Button
            name="usuń"
            type="medium delete"
            handleClick={() => removeFromOrderArray(id)}
            />
        </li>

    )
}