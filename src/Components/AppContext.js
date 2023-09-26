import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
// stan złozónego zamówienia
    const [acceptedOrdersArray, setAcceptedOrdersArray] = useState([]);
//stan BurgerNav
    const [isBurgerNavActive, setIsBurgerNavActive] = useState(false)

////////////////////////////////////////////////////////////
//sprawdenie ilości artykułow
    const  getItemQuantity = (id) => {
        return orderArray.find(item => item.id === id)?.quantity || 0;
    }
//zwiększenie ilości artykułów
    const increaseItemQuantity = (id) => {
        setOrderArray(currentItems => {
            if(currentItems.find(item => item.id === id) == null){
                return [...currentItems, { id, quantity: 1 }]
            } else {
                return currentItems.map(item => {
                    if(item.id === id){
                        return { ...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }
//zmniejszenie ilości artykułów
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
//usuwanie elementu z zamówienia
const removeFromOrderArray = (id) => {
    setOrderArray(currentItems => {
        return currentItems.filter(item => item.id !== id)
    })
}
const orderQuantity = orderArray.reduce((quantity, item) => item.quantity + quantity, 0)
//przujęcie zamówienia

const handleOrderIsSend = () => {
    alert("Zamówienie wysłano");
   
    console.log(acceptedOrdersArray)
}
//obsługa inputów Admina
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

//obsługa formularza Admina
    const handleSubmit = (e, type) => {
        e.preventDefault();
        if(type === "add"){
            const cloneArray = [...menuArray];
            const { name, price, ingredients, category } = addMenuElement
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
            const element = cloneArray.find(el => el.id === editMenuElement.id);
            element.name = editMenuElement.name;
            element.price = editMenuElement.price;
            element.ingredients = editMenuElement.ingredients;
            element.category = editMenuElement.category;
            navigate("/admin/menu")
        }
    }
// EDIT Menu Element Admin
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
// DELETE Menu Element Admin
    const handleAdminDEleteElementMenu = (id) => {
        const cloneArray = [...menuArray];
        const index = cloneArray.findIndex(el => el.id === id);
        cloneArray.splice(index, 1);
        setMenuArray(cloneArray)
    }
    return(
        <AppContext.Provider
         value={{
            addMenuElement,
            editMenuElement,
            isBurgerNavActive,
            menuArray,
            orderArray,
            orderQuantity,
            handleInputValue,
            handleOrderIsSend,
            handleSubmit,
            handleAdminEditElementMenu,
            handleAdminDEleteElementMenu,
            getItemQuantity,
            increaseItemQuantity,
            decreaseItemQuantity,
            removeFromOrderArray,
            setIsBurgerNavActive,
            setAddMenuElement,
            setEditMenuElement,
        }}
        >
            {children}
        </AppContext.Provider>
    )
}