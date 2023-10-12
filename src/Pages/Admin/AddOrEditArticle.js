import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import Button from '../../Components/elements/Button/Button';
import Input from '../../Components/elements/Input/Input';
import './AdminPage.css'
import ArrowBack from '../../Components/elements/GoBack/GoBack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddOrEditArticle = ({type}) => {
    const { 
        addMenuElement,
        editMenuElement,
        menuArray,
        setMenuArray,
        setAddMenuElement,
        setEditMenuElement, 
        setModal, 
    } = useContext(AppContext);
    const { name, price, ingredients } = type === "add" ? addMenuElement : editMenuElement;
    const navigate = useNavigate();
    //ADMIN HANDLE ADD OR EDIT ITEM
    const handleInputValue = (e) => {
        switch(e.target.name){
            case "addName":
                return setAddMenuElement(prevState => ({ ...prevState, name: e.target.value}));
            case "addPrice":
                return setAddMenuElement(prevState => ({ ...prevState, price: Number(e.target.value)}));
            case "addIngredients": 
                return setAddMenuElement(prevState => ({ ...prevState, ingredients: e.target.value}));
            case "editName":
                return setEditMenuElement(prevState => ({ ...prevState, name: e.target.value}));
            case "editPrice":
                return setEditMenuElement(prevState => ({ ...prevState, price: Number(e.target.value)}));
            case "editIngredients":
                return setEditMenuElement(prevState => ({ ...prevState, ingredients: e.target.value}));
            default: return;
        }
    }
    //ADMIN HANDLE ADD ITEM FORM
    const handleSubmit = async (e, type, setModal, postMenuItem ) => {
        e.preventDefault();
        if(type === "add"){
            const cloneArray = [...menuArray];
            //destruction
            const { name, price, ingredients, category } = addMenuElement
            //validation
            if(!name.length || !price || !ingredients.length || !category) {
                return (
                    setModal(({
                        isVisible: true,
                        value: "Wszystkie pola są wymagane",
                        buttons: false,
                    }))
            )}
            //post to backend
            const res = await axios.post("http://localhost:3001/api/menu_items", {name, price, ingredients, category});
            const item = res.data
            //post to front
            cloneArray.push({
                id: item._id,
                name: item.name,
                price: item.price,
                ingredients: item.ingredients,
                category: item.category,
            });
            setMenuArray(cloneArray);
            setModal(({
                isVisible: true,
                value: "Artykuł został dodany do menu",
                buttons: false,
            }))
            setAddMenuElement({
                name: "",
                price: "",
                ingredients: "",
                category: "",
            })
        } else if (type === "edit"){
            const cloneArray = [...menuArray];
            const { name, price, ingredients, category, id } = editMenuElement
            if(!name.length || !price || !ingredients.length || !category){
                return (
                setModal(({
                    isVisible: true,
                    value: "Uzupełnij wszystkie pola",
                    buttons: false,
                }))
            )}
            //send update to backend
            const res = await axios.put(`http://localhost:3001/api/menu_items/${id}`, {name, price, ingredients, category});  
            //update on frontend
            const element = cloneArray.find(el => el.id === id);    
            element.name = res.data.name;
            element.price = res.data.price;
            element.ingredients = res.data.ingredients;
            element.category = res.data.category;
            setModal(({
                isVisible: true,
                value: "Artykuł został zmieniony",
                buttons: false,
            }))
            navigate("/admin/menu")
        }
    }
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



