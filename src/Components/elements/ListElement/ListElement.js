import { formatCurency } from '../../../tools/formatCurency';
import './ListElement.css';

const ListElement = ({id, name, price, indx, ingredients, button, quantity }) => {
    const nr = `${indx + 1}.`
    return ( 
        <li key={id} className="list-element">
                <b>{nr}</b>
                <p>{name}</p>
                <i>{quantity == null ? ingredients : quantity + "X"}</i>
                <p>{formatCurency(price)}</p>
                {button}
        </li>
     );
}
export default ListElement;