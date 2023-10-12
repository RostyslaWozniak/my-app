import React, { useState, useEffect } from 'react';
import axios from "axios";
export const AppContext = React.createContext();

export const AppProvider = ({children}) => {
///////////////////////////////////////////////////////
 //LOGIN STATE
 const [ isAdminLogged, setIsAdminLogged ] = useState(false);
 const [ loginInput, setLoginInput ] = useState({ loginName: "", loginPassword: "" });
//LOGIN MESSAGES
 const [ loginMessage, setLoginMessage] = useState(null);
 //REGISTERED USERS STATE
const [ registeredUsersMap, setRegisteredUsersMap ] = useState(new Map());
 //user name STATE
 const [ currentUser, setCurrentUser ] = useState("User");
 //MODAL STATE
 const [modal, setModal] = useState({
    isVisible: false,
    value: null,
    buttons: false, 
});  
    
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
    const [menuArray, setMenuArray] = useState([]);
//Order STATE
    const [orderArray, setOrderArray] = useState([])
//SEND ORDER STATE
    const [sendOrderArray, setSendOrderArray] = useState([]);
//BurgerNav STATE
    const [isBurgerNavActive, setIsBurgerNavActive] = useState(false)

////////////////////////////////////////////////////////////

//Get registrate users
    const getUsersData = async () => {
        const res = await axios.get('http://localhost:3001/api/user')
        const users = [...res.data]
        users.forEach(user => {
            setRegisteredUsersMap(registeredUsersMap.set(
                      user.name, {
                        id: user._id,
                        password: user.password,
                        isUserLogged: user.isUserLogged,
                        orderArray: user.orderArray,
                        isOrderSended: user.isOrderSended,
                      }  
                )) 
        });
    }
    const getMenuData = async () => {
        const res = await axios.get("http://localhost:3001/api/menu_items");
        const menu = res.data.map(el => {
            const { _id, name, price, ingredients, category } = el;
            return ({
                id: _id,
                name,
                price,
                ingredients,
                category,
            });
        });
        setMenuArray(menu)
    }
    useEffect(() => {
        getUsersData();
        getMenuData();

    }, [])



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

    return(
        <AppContext.Provider
         value={{
            addMenuElement,
            currentUser,
            editMenuElement,
            isAdminLogged,
            isBurgerNavActive,
            loginInput,
            loginMessage,
            modal,
            menuArray,
            orderArray,
            registeredUsersMap,
            sendOrderArray,
            getOrderItemsQuantity,
            decreaseItemQuantity,
            getItemQuantity,
            increaseItemQuantity,
            setAddMenuElement,
            setEditMenuElement,
            setIsBurgerNavActive,
            setOrderArray,
            setSendOrderArray,
            setMenuArray,
            setLoginMessage,
            setLoginInput,
            setModal,
            setRegisteredUsersMap,
            setCurrentUser,
            setIsAdminLogged,
        }}
        >
            {children}
        </AppContext.Provider>
    )
}