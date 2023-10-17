import Button from "../../Components/elements/Button/Button";
import ListElement from "../../Components/elements/ListElement/ListElement";
import { useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import ArrowBack from "../../Components/elements/GoBack/GoBack";
import axios from "../../tools/axiosTool";
import { useNavigate } from "react-router-dom";

const EditMenu = () => {
    const { menuArray, setMenuArray, setEditMenuElement } = useContext(AppContext);  
    const navigate = useNavigate(); 
    // ADMIN HANDLE EDIT ITEM FORM
    const handleAdminEditElementMenu = (id) => {
        const cloneArray = [...menuArray];
        const element = cloneArray.find(el => el.id === id)
        navigate("/admin/menu/edit")
        const { name, price, ingredients, category } = element;
        setEditMenuElement({
            id: element.id,
            name,
            price,
            ingredients,
            category,
        })
    }   
    // ADMIN HANDLE DELETE ITEM
    const handleAdminDEleteElementMenu = async (id) => {
        const cloneArray = [...menuArray];
        await axios.delete(`/menu_items/${id}`);
        const index = cloneArray.findIndex(el => el.id === id);
        cloneArray.splice(index, 1);
        setMenuArray(cloneArray)
    }
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
            <ArrowBack/>
        </>
    );
}
 
export default EditMenu;