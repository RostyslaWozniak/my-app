import { formatCurency } from '../../../tools/formatCurency';
import './ListElement.css';

const ListElement = ({id, name, price, ingredients, button, quantity, category }) => {
    return ( 
        <li key={id} className="list-element">
                <div className="name"><p>{name}</p></div>
                <div><i>{quantity == null ? ingredients : quantity + "X"}</i></div>
                <div className="price"><p>{formatCurency(price)}</p></div>
                <div className="button">{button}</div>
        </li>
     );
}
export default ListElement;