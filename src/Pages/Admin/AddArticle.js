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
        console.log(value)
    }
    const categoryButtons = <div className="category-buttons">
        <p>Kategoria: </p>
        <Button
            name="obiady"
            type="medium"
            handleClick={() => chooseCategory("obiady")}
        />
        <Button
            name="sałatki"
            type="medium"
            handleClick={() => chooseCategory("sałatki")}
        />
        <Button
            name="desery"
            type="medium"
            handleClick={() => chooseCategory("desery")}
        />
        <Button
            name="napoje"
            type="medium"
            handleClick={() => chooseCategory("napoje")}
        />
    </div>
    return ( 
        <>
            <h2>Dodaj Artykuł</h2>
            <form onSubmit={(e) => handleSubmit(e, "add")}>
                {showInputs}
                {categoryButtons}
                <Button 
                    name="dodaj"
                    type="large accept"
                />
            </form> 
        </>
     );
}
 
export default AddArticle;