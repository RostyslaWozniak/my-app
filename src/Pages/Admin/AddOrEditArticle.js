import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../Components/AppContext';
import Button from '../../Components/elements/Button/Button';
import Input from '../../Components/elements/Input/Input';
import './AdminPage.css'
import { LoginContext } from '../../Components/LoginContext';
import ArrowBack from '../../Components/elements/GoBack/GoBack';

const AddOrEditArticle = ({type}) => {
    const { 
        editMenuElement,
        setEditMenuElement, 
        addMenuElement,
        setAddMenuElement,
        handleInputValue,
        handleSubmit,
    } = useContext(AppContext);
    const { setModal } = useContext(LoginContext);
    const { name, price, ingredients } = type === "add" ? addMenuElement : editMenuElement;
 //categories
    const lunch = "obiady"
    const salads = "sałatki";
    const desserts = "desery";
    const drinks = "napoje"
    const formInputsArray = [
        {
            label: "Nazwa", 
            name: `${type}Name`, 
            type: "text", 
            placeholder: "Wpisz nazwę...", 
            onChange: handleInputValue, 
            value: name,
        },
        {
            label: "Cena", 
            name: `${type}Price`, 
            type: "number", 
            placeholder: "Wpisz cenę...", 
            onChange: handleInputValue, 
            value: price,
        },
        {
            label: "Składniki", 
            name: `${type}Ingredients`, 
            type: "text", 
            placeholder: "Wpisz składniki...", 
            onChange: handleInputValue, 
            value: ingredients,
        },
    ];
    const showInputs = formInputsArray.map((input, id) => (
        <Input 
            key={id}
            {...input}
        />
    ))
    const chooseCategory = (value) => {
        if(type === "add"){
            return setAddMenuElement(prevState => ({ ...prevState, category: value}));
        }else if(type === "edit"){
            return setEditMenuElement(prevState => ({ ...prevState, category: value}));
        }
    }
    //ACTIVE CATEGORY BUTTON
    const btnClass = (category) => {
        if(type === "add"){
            return addMenuElement.category === category ? "accept" : "";
        }else if(type === "edit"){
            return editMenuElement.category === category ? "accept" : "";
        }
    }
    const categoryButtons = <div className="category-buttons">
        <p>Kategoria</p>
        <Button
            type="button"
            name={lunch}
            className={`medium ${btnClass(lunch)}`}
            onClick={() => chooseCategory(lunch)}
        />
        <Button
            type="button"
            name={salads}
            className={`medium ${btnClass(salads)}`}
            onClick={() => chooseCategory(salads)}
        />
        <Button
            type="button"
            name={desserts}
            className={`medium ${btnClass(desserts)}`}
            onClick={() => chooseCategory(desserts)}
        />
        <Button
            type="button"
            name={drinks}
            className={`medium ${btnClass(drinks)}`}
            onClick={() => chooseCategory(drinks)}
        />
    </div>
    return ( 
        <>
            <h2>{type === "add" ? "Dodaj Artykuł" : "Edytuj Artykuł"}</h2>
            <form onSubmit={(e) => handleSubmit(e, type, setModal)}>
                {showInputs}
                {categoryButtons}
                <Button 
                    type="submit"
                    name={type === "add" ? "dodaj" : "zmień"}
                    className="large accept"
                />
            </form> 
            <ArrowBack/>
        </>
     );
}
export default AddOrEditArticle;



