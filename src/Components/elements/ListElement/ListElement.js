import { formatCurency } from '../../../tools/formatCurency';
import './ListElement.css';

const ListElement = ({id, name, price, ingredients, button, quantity }) => {
    const showPrice = price && formatCurency(price);

    return ( 
        <li key={id} className="list-element">
                <div className="name"><p>{name}</p></div>
                <div className="descriptions">{ingredients}</div>
                <div><p>{showPrice}</p></div>
                <div className="button">{button}</div>
        </li>
     );
}
export default ListElement;