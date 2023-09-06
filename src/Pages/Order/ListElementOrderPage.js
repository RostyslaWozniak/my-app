import { useContext } from "react"
import Button from "../../Components/elements/Button"
import { AppContext } from "../../Components/AppContext"

export const ListElementOrderPage = ({id, quantity, index}) => {
    const { removeFromOrderArray, menuArray  } = useContext(AppContext)
        const item = menuArray.find(el => el.id === id);
    return( 
        <li key={id}>
            <b>{index + 1}.</b>
            <p>{item.name} </p>
            <p>x{quantity}</p>
            <p>{item.price}</p>
            <Button
            name="usuń"
            type="medium"
            handleClick={() => removeFromOrderArray(id)}
            />
        </li>
    )
}