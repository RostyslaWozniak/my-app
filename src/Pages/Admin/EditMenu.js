import Button from "../../Components/elements/Button/Button";
import ListElement from "../../Components/elements/ListElement/ListElement";
import { useContext } from "react";
import { AppContext } from "../../Components/AppContext";

const EditMenu = () => {
    const { menuArray, handleAdminDEleteElementMenu, handleAdminEditElementMenu, handleSubmit } = useContext(AppContext);    
    
    const item = menuArray.map(el => {
        const buttons = 
        <div className="edit-buttons">
            <Button
            className="medium"
            name="edytuj"
            onClick={() => handleAdminEditElementMenu(el.id)}
            />
            <Button
            className="medium delete"
            name="usuń"
            onClick={() => handleAdminDEleteElementMenu(el.id)}
            />
        </div>
        return(
        <ListElement
        key={el.id}
        name={el.name}
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