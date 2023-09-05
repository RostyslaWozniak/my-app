import { useContext } from "react"
import Button from "../../Components/elements/Button"
import { AppContext } from "../../Components/AppContext"

export const ListElementOrderPage = ({id, name, price, index}) => {
    const { handleDeleteElementFromOrder, orderArray  } = useContext(AppContext)

    return( 
        <li key={id}>
            <p>{index + 1}. {name}</p>
            <p>{price} zł</p>
            <Button
            name="usuń"
            type="medium"
            handleClick={() => handleDeleteElementFromOrder(id)}
            />
        </li>
    )
}