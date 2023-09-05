import { useContext } from "react"
import Button from "../../Components/elements/Button"
import { AppContext } from "../../Components/AppContext"

export const ListElementOrderPage = ({id, name, price}) => {
    const { handleDeleteElementFromArder } = useContext(AppContext)

        const stackElements = () => {

        }
    return(
        <li key={id}>
            <p>{name}</p>
            <p>{price} zł</p>
            <Button
            name="usuń"
            type="medium"
            handleClick={() => handleDeleteElementFromArder(id)}
            />
        </li>
    )
}