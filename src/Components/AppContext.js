import React, { useState } from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({children}) => {

//stan formularza Admina
    const [adminInputName, setInputName] = useState("");
    const [adminInputPrice, setInputPrice] = useState("");
    const [adminInputIngredients, setInputIngridients] = useState("");

//Menu
    const [menuArray, setMenuArray] = useState([
        {id: 1, name: "barszcz", price: 12.99, ingredients: "buraki, ziemniaki, smietana"},
        {id: 2, name: "pierogi", price: 18.99, ingredients: "ciasto, ziemniaki, smietana"},
        {id: 3, name: "mizeria", price: 11.99, ingredients: "ogórki, koperek, smietana"},
    ]);
//ilość zamówionych artykułów
const [quantity, setQuantity] = useState(0)
//Order
    const [orderArray, setOrderArray] = useState([]);

// dodawanie do zamówienia
    const handleAddToOrder = (id) => {
        const cloneArray = [...orderArray];
        const item = menuArray.filter(el => el.id === id)
     
        cloneArray.push(
            {
            id: Math.floor(Math.random() * new Date()),
            name: item[0].name,
            price: item[0].price,
            ingredients: item[0].ingredients,
            }
        )
        setQuantity(prevState => prevState + 1)
        setOrderArray(cloneArray);
        
    }
//usuwanie elementu z zamówienia
    const handleDeleteElementFromOrder = (id) => {
        const cloneArray = [...orderArray];
        const index = cloneArray.findIndex(el => el.id === id)
        cloneArray.splice(index, 1);
        setOrderArray(cloneArray);
        setQuantity(prevState => prevState - 1)
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
                price: adminInputPrice,
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
            quantity,
            handleAddToOrder,
            handleDeleteElementFromOrder,
            handleInputValue,
            handleSubmit,
            
        }}
        >
            {children}
        </AppContext.Provider>
    )
}