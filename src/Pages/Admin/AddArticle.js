import React, { useContext } from 'react';
import { AppContext } from '../../Components/AppContext';
import Button from '../../Components/elements/Button/Button';
import Input from '../../Components/elements/Input/Input';
import './AdminPage.css'

const AddArticle = () => {
    const { 
        addMenuElement,
        setAddMenuElement,
        
        handleInputValue,
        handleSubmit,
    } = useContext(AppContext);
    const { name, price, ingredients, category} = addMenuElement;
    const formInputsArray = [
        {label: "Nazwa", name: "addName", type: "text", placeholder: "Wpisz nazwę...", onChange: handleInputValue, value: name},
        {label: "Cena", name: "addPrice", type: "number", placeholder: "Wpisz cenę...", onChange: handleInputValue, value: price},
        {label: "Składniki", name: "addIngredients", type: "text", placeholder: "Wpisz składniki...", onChange: handleInputValue, value: ingredients},
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
        setAddMenuElement(prevState => ({ ...prevState, category: value}));
    }
    const categoryButtons = <div className="category-buttons">
        <p>Kategoria: </p>
        <Button
            type="button"
            name="obiady"
            className="medium"
            onClick={() => chooseCategory("obiady")}
        />
        <Button
            type="button"
            name="sałatki"
            className="medium"
            onClick={() => chooseCategory("sałatki")}
        />
        <Button
            type="button"
            name="desery"
            className="medium"
            onClick={() => chooseCategory("desery")}
        />
        <Button
            type="button"
            name="napoje"
            className="medium"
            onClick={() => chooseCategory("napoje")}
        />
    </div>
    return ( 
        <>
            <h2>Dodaj Artykuł</h2>
            <form onSubmit={(e) => handleSubmit(e, "add")}>
                {showInputs}
                {categoryButtons}
                <Button 
                    type="submit"
                    name="dodaj"
                    className="large accept"
                />
            </form> 
        </>
     );
}
 
export default AddArticle;