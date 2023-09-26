import { useContext } from "react";
import { AppContext } from "../../Components/AppContext";
import Input from "../../Components/elements/Input/Input";
import Button from "../../Components/elements/Button/Button";

const EditMenuElement = () => {
    const {
        handleInputValue,
        handleSubmit,
        editMenuElement,
        setEditMenuElement,
    } = useContext(AppContext);
    const { name, price, ingredients, category} = editMenuElement;
    const formInputsArray = [
        {label: "Nazwa", name: "editName", type: "text", placeholder: "Wpisz nazwę...", onChange: handleInputValue, value: name},
        {label: "Cena", name: "editPrice", type: "number", placeholder: "Wpisz cenę...", onChange: handleInputValue, value: price},
        {label: "Składniki", name: "editIngredients", type: "text", placeholder: "Wpisz składniki...", onChange: handleInputValue, value: ingredients},
    ];
    const showInputs = formInputsArray.map((input, id) => (
        <Input
            key={id}
            label={input.label}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            onChange={input.onChange}   
            value={input.value}
        />
    ))
    const chooseCategory = (value) => {
        setEditMenuElement(prevState => ({ ...prevState, category: value}));
    }
    const categoryButtons = <div className="category-buttons">
        <p>Kategoria: </p>
        <Button
            name="obiady"
            className="medium"
            onClick={() => chooseCategory("obiady")}
        />
        <Button
            name="sałatki"
            className="medium"
            onClick={() => chooseCategory("sałatki")}
        />
        <Button
            name="desery"
            className="medium"
            onClick={() => chooseCategory("desery")}
        />
        <Button
            name="napoje"
            className="medium"
            onClick={() => chooseCategory("napoje")}
        />
    </div>
    return ( 
        <>
            <h2>Edytój Artykuł</h2>
            <form onSubmit={(e) => handleSubmit(e, "edit")}>
                {showInputs}
                {categoryButtons}
                <Button 
                    type="submit"
                    name="zmień"
                    className="large accept"
                />
            </form> 
        </>
     );
}
 
export default EditMenuElement;