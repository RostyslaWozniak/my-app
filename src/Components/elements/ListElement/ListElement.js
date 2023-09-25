import { formatCurency } from '../../../tools/formatCurency';
import './ListElement.css';

const ListElement = ({id, name, price, ingredients, button, quantity }) => {
    return ( 
        <li key={id} className="list-element">
                <p>{name}</p>
                <i>{quantity == null ? ingredients : quantity + "X"}</i>
                <p>{formatCurency(price)}</p>
                {button}
        </li>
     );
}
export default ListElement;