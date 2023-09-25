import { formatCurency } from '../../../tools/formatCurency';
import './ListElement.css';

const ListElement = ({id, name, price, ingredients, button, quantity }) => {
    return ( 
        <li key={id} className="list-element">
                <div><p>{name}</p></div>
                <div><i>{quantity == null ? ingredients : quantity + "X"}</i></div>
                <div><p>{formatCurency(price)}</p></div>
                <div>{button}</div>
        </li>
     );
}
export default ListElement;