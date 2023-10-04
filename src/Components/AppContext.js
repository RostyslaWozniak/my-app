import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorPage from '../Pages/ErrorPage';
export const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    const navigate = useNavigate();
//Add Admin Element Menu STATE
    const [addMenuElement, setAddMenuElement] = useState({
        name: "",
        price: "",
        ingredients: "",
        category: "",
    })
//Edit Admin Element Menu SATE
    const [editMenuElement, setEditMenuElement] = useState({
        name: "",
        price: "",
        ingredients: "",
        category: "",
    });
//Menu STATE
    const [menuArray, setMenuArray] = useState([
        {id: 1, name: "barszcz", price: 12.99, ingredients: "buraki, ziemniaki, smietana", category: "obiady",},
        {id: 2, name: "pierogi", price: 18.99, ingredients: "ciasto, mięso z indyka, smietana", category: "obiady",},
        {id: 3, name: "kolesław", price: 11.99, ingredients: "kapusta, marchewka, jabko", category: "sałatki",},
        {id: 4, name: "piwerko", price: 17.99, ingredients: "z syropem", category: "napoje",},
        {id: 5, name: "schabowy", price: 15.99, ingredients: "mięso wiepszowe", category: "obiady",},
        {id: 6, name: "tort", price: 25.99, ingredients: "cukier woda", category: "desery",},
        {id: 7, name: "mizeria", price: 12.99, ingredients: "ogórek, jogurt, koperek", category: "sałatki",},
        {id: 8, name: "sok", price: 9.99, ingredients: "pomaranczowy", category: "napoje",},
        {id: 9, name: "sangria", price: 32.99, ingredients: "z owocami", category: "napoje",},
        {id: 10, name: "ciasto bananowe", price: 30.99, ingredients: "banany, smietana, cukier", category: "desery",},
        {id: 11, name: "pierogi na słodko", price: 19.99, ingredients: "jagody, smietana, dżem", category: "desery",},
        {id: 12, name: "woda", price: 0, ingredients: "woda nie gazowana lub gazowana", category: "napoje",},

    ]);
//Order STATE
    const [orderArray, setOrderArray] = useState([])
//SEND ORDER STATE
    const [sendOrderArray, setSendOrderArray] = useState([]);
//BurgerNav STATE
    const [isBurgerNavActive, setIsBurgerNavActive] = useState(false)

////////////////////////////////////////////////////////////
//CHECK QUANTITY OF ITEM
const  getItemQuantity = (id) => {
    return orderArray.find(item => item.id === id)?.quantity || 0;
}
//INCREASE QUANTITY OF ITEMS
const increaseItemQuantity = (id) => {
    setOrderArray(currentItems => {
        if(currentItems.find(item => item.id === id) == null){
            return [...currentItems, { id, quantity: 1 }]
        } else {
            return currentItems.map(item => {
                if(item.id === id){
                    return {...item, quantity: item.quantity + 1}
                } else {
                    return item
                }
            })
        }
    })
    
}
//DECREASE QUANTITY OF ITEMS
const decreaseItemQuantity = (id) => {
setOrderArray(currentItems => {
    if(currentItems.find(item => item.id === id)?.quantity === 1){
        return currentItems.filter(item => item.id !== id)
    } else {
        return currentItems.map(item => {
            if(item.id === id){
                return { ...item, quantity: item.quantity - 1}
            } else {
                return item
            }
        })
    }
})
}
const getOrderItemsQuantity = () => {
    return orderArray.reduce((quantity, item) => item.quantity + quantity, 0)
}
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
    const handleSubmit = (e, type) => {
        e.preventDefault();
        if(type === "add"){
            const cloneArray = [...menuArray];
            const { name, price, ingredients, category } = addMenuElement
            if(!name.length || !price || !ingredients.length || !category)return alert("Wszystkie pola są wymagane");
            cloneArray.push({
                id: Math.floor(Math.random() * new Date()),
                name,
                price,
                ingredients,
                category,
            });
            setMenuArray(cloneArray);
            setAddMenuElement({
                name: "",
                price: "",
                ingredients: "",
                category: "",
            })
        } else if (type === "edit"){
            const cloneArray = [...menuArray];
            const { name, price, ingredients, category, id } = editMenuElement
            if(!name.length || !price || !ingredients.length || !category)return alert("Uzupełnij wszystkie pola");
            const element = cloneArray.find(el => el.id === id);            
            element.name = name;
            element.price = price;
            element.ingredients = ingredients;
            element.category = category;
            navigate("/admin/menu")
        }
    }
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
    const handleAdminDEleteElementMenu = (id) => {
        const cloneArray = [...menuArray];
        const index = cloneArray.findIndex(el => el.id === id);
        cloneArray.splice(index, 1);
        setMenuArray(cloneArray)
    }

//Send ORDER
const handleOrderIsSend = (userName, registeredUsersMap, totalPrice) => {
    if(!registeredUsersMap.has(userName))return alert("musisz zalogować się");
    alert(`${userName}, twoje zamówienie zostało przyjęte`);
    const cloneArr = [...orderArray];
    const date = new Date().toLocaleTimeString();
    setSendOrderArray(prevState => ( [...prevState, { userName, totalPrice, date, order: [...cloneArr] }]))
}
    return(
        <AppContext.Provider
         value={{
            addMenuElement,
            editMenuElement,
            isBurgerNavActive,
            menuArray,
            orderArray,
            sendOrderArray,
            getOrderItemsQuantity,
            decreaseItemQuantity,
            getItemQuantity,
            handleAdminDEleteElementMenu,
            handleAdminEditElementMenu,
            handleInputValue,
            handleOrderIsSend,
            handleSubmit,
            increaseItemQuantity,
            setAddMenuElement,
            setEditMenuElement,
            setIsBurgerNavActive,
            setOrderArray,
        }}
        >
            {children}
        </AppContext.Provider>
    )
}