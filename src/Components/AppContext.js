import React, { useState } from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    const [adminInputName, setInputName] = useState("");
    const [adminInputPrice, setInputPrice] = useState("");
    const [adminInputIngredients, setInputIngridients] = useState("");
    const [menuArray, setMenuArray] = useState([])

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
            handleInputValue,
            handleSubmit,
        }}
        >
            {children}
        </AppContext.Provider>
    )
}