import { useContext } from "react";
import { AppContext } from "../../Components/AppContext";
import Button from "../../Components/elements/Button";
import ListElement from "../../Components/elements/ListElement/ListElement";

const EditMenu = () => {
    const { menuArray } = useContext(AppContext);    
    
    const item = menuArray.map((el, indx) => {
        const nr = `${indx + 1}.`
        const buttons = 
        <div className="edit-buttons">
            <Button
            type="medium"
            name="edytuj"
            handleClick={() => console.log('edit')}
            />
            <Button
            type="medium delete"
            name="usuń"
            handleClick={() => console.log('delete')}
            />
        </div>
        return(
        <ListElement
        key={el.id}
        name={el.name}
        indx={indx}
        price={el.price}
        ingredients={el.ingredients}
        button={buttons}
        />
    )})
    return ( 
        <>
            <h2>Edytuj menu</h2>
            {item}
        </>
    );
}
 
export default EditMenu;