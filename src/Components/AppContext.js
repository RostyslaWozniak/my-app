import React, { useState } from 'react';


export const AppContext = React.createContext();

export const AppProvider = ({children}) => {

//stan formularza Admina
    const [adminInputName, setInputName] = useState("");
    const [adminInputPrice, setInputPrice] = useState("");
    const [adminInputIngredients, setInputIngridients] = useState("");
    const [adminInputKategory, setInputKategory] = useState("");

//Stan Menu 
    const [menuArray, setMenuArray] = useState([
        {id: 1, name: "barszcz", price: 12.99, ingredients: "buraki, ziemniaki, smietana", kategory: "obiady",},
        {id: 2, name: "pierogi", price: 18.99, ingredients: "ciasto, mięso z indyka, smietana", kategory: "obiady",},
        {id: 3, name: "kolesław", price: 11.99, ingredients: "kapusta, marchewka, jabko", kategory: "sałatki",},
        {id: 4, name: "piwerko", price: 17.99, ingredients: "z syropem", kategory: "napoje",},
        {id: 5, name: "schabowy", price: 15.99, ingredients: "mięso wiepszowe", kategory: "obiady",},
        {id: 6, name: "tort", price: 25.99, ingredients: "cukier woda", kategory: "desery",},
        {id: 7, name: "mizeria", price: 12.99, ingredients: "ogórek, jogurt, koperek", kategory: "sałatki",},
        {id: 8, name: "sok", price: 9.99, ingredients: "pomaranczowy", kategory: "napoje",},
        {id: 9, name: "sangria", price: 32.99, ingredients: "z owocami", kategory: "napoje",},
        {id: 10, name: "ciasto bananowe", price: 30.99, ingredients: "banany, smietana, cukier", kategory: "desery",},
        {id: 11, name: "pierogi na słodko", price: 19.99, ingredients: "jagody, smietana, dżem", kategory: "desery",},
        {id: 12, name: "woda", price: 0, ingredients: "woda nie gazowana lub gazowana", kategory: "napoje",},

    ]);
//Stan Order
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

const handleOrederIsSend = () => {
    alert("Zamówienie wysłano");
   
    console.log(acceptedOrdersArray)
}
//obsługa inputów Admina
    const handleInputValue = (e) => {
        switch(e.target.name){
            case "name":
                return setInputName(e.target.value);
            case "price":
                return setInputPrice(e.target.value);
            case "ingridients": 
                return setInputIngridients(e.target.value);
            case "kategory": 
                return setInputKategory(e.target.value);
            default: return;
        }
    }

//obsługa formularza Admina
    const handleSubmit = (e) => {
        e.preventDefault()
        const cloneArray = [...menuArray];
        cloneArray.push(
            {
                id: Math.floor(Math.random() * new Date()),
                name: adminInputName,
                price: Number(adminInputPrice),
                ingredients: adminInputIngredients,
                kategory: adminInputKategory,
            }
        );
        setMenuArray(cloneArray);
        setInputName("");
        setInputPrice("");
        setInputIngridients("");
        setInputKategory("");
    }
   
    return(
        <AppContext.Provider
         value={{
            adminInputName,
            adminInputPrice,
            adminInputIngredients,
            adminInputKategory,
            isBurgerNavActive,
            menuArray,
            orderArray,
            orderQuantity,
            handleInputValue,
            handleOrederIsSend,
            handleSubmit,
            getItemQuantity,
            increaseItemQuantity,
            decreaseItemQuantity,
            removeFromOrderArray,
            setIsBurgerNavActive,
        }}
        >
            {children}
        </AppContext.Provider>
    )
}