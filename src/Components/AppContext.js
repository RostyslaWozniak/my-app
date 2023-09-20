import React, { useState } from 'react';


export const AppContext = React.createContext();

export const AppProvider = ({children}) => {

//stan formularza Admina
    const [adminInputName, setInputName] = useState("");
    const [adminInputPrice, setInputPrice] = useState("");
    const [adminInputIngredients, setInputIngridients] = useState("");

//Stan Menu 
    const [menuArray, setMenuArray] = useState([
        {id: 1, name: "barszcz", price: 12.99, ingredients: "buraki, ziemniaki, smietana"},
        {id: 2, name: "pierogi", price: 18.99, ingredients: "ciasto, ziemniaki, smietana"},
        {id: 3, name: "mizeria", price: 11.99, ingredients: "ogórki, koperek, smietana",},
    ]);
//Stan Order
    const [orderArray, setOrderArray] = useState([])
// stan złozónego zamówienia
    const [acceptedOrdersArray, setAcceptedOrdersArray] = useState([]);
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
                break;
            case "price":
                return setInputPrice(e.target.value);
                break;
            case "ingridients": 
                return setInputIngridients(e.target.value)
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
            }
        );
        setMenuArray(cloneArray);
        setInputName("");
        setInputPrice("");
        setInputIngridients("");
    }
   
    return(
        <AppContext.Provider
         value={{
            adminInputName,
            adminInputPrice,
            adminInputIngredients,
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
        }}
        >
            {children}
        </AppContext.Provider>
    )
}