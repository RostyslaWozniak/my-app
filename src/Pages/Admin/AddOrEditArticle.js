import React, { useContext } from 'react';
import { AppContext } from '../../Components/AppContext';
import Button from '../../Components/elements/Button/Button';
import Input from '../../Components/elements/Input/Input';
import './AdminPage.css'

const AddOrEditArticle = ({type}) => {
    const { 
        editMenuElement,
        setEditMenuElement,
        addMenuElement,
        setAddMenuElement,
        handleInputValue,
        handleSubmit,
    } = useContext(AppContext);
    
    const { name, price, ingredients } = type === "add" ? addMenuElement : editMenuElement;
      
    const formInputsArray = [
        {label: "Nazwa", name: `${type}Name`, type: "text", placeholder: "Wpisz nazwę...", onChange: handleInputValue, value: name},
        {label: "Cena", name: `${type}Price`, type: "number", placeholder: "Wpisz cenę...", onChange: handleInputValue, value: price},
        {label: "Składniki", name: `${type}Ingredients`, type: "text", placeholder: "Wpisz składniki...", onChange: handleInputValue, value: ingredients},
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
        if(type === "add"){
            return setAddMenuElement(prevState => ({ ...prevState, category: value}));
        }else if(type === "edit"){
            return setEditMenuElement(prevState => ({ ...prevState, category: value}));
        }
    }
    const btnClass = (category) => {
        if(type === "add"){
            return addMenuElement.category === category ? "accept" : "";
        }else if(type === "edit"){
            return editMenuElement.category === category ? "accept" : ""
        }
    }
    const categoryButtons = <div className="category-buttons">
        <p>Kategoria: </p>
        <Button
            type="button"
            name="obiady"
            className={`medium ${btnClass("obiady")}`}
            onClick={() => chooseCategory("obiady")}
        />
        <Button
            type="button"
            name="sałatki"
            className={`medium ${btnClass("sałatki")}`}
            onClick={() => chooseCategory("sałatki")}
        />
        <Button
            type="button"
            name="desery"
            className={`medium ${btnClass("desery")}`}
            onClick={() => chooseCategory("desery")}
        />
        <Button
            type="button"
            name="napoje"
            className={`medium ${btnClass("napoje")}`}
            onClick={() => chooseCategory("napoje")}
        />
    </div>
    return ( 
        <>
            <h2>{type === "add" ? "Dodaj Artykuł" : "Edytuj Artykuł"}</h2>
            <form onSubmit={(e) => handleSubmit(e, type)}>
                {showInputs}
                {categoryButtons}
                <Button 
                    type="submit"
                    name={type === "add" ? "dodaj" : "zmień"}
                    className="large accept"
                />
            </form> 
        </>
     );
}
export default AddOrEditArticle;