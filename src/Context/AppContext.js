import React, { useState, useEffect } from 'react';
import axios from '../tools/axiosTool';
import { useNavigate } from 'react-router-dom';
import {formatCurency} from '../tools/formatCurency';
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
 //user STATE
 const [ currentUser, setCurrentUser ] = useState(null);
 //MODAL STATE
 const [modal, setModal] = useState({
    isVisible: false,
    value: null,
    buttons: false, 
});     
//Add INPUT Admin Element Menu STATE
    const [addMenuElement, setAddMenuElement] = useState({
        name: "",
        price: "",
        ingredients: "",
        category: "",
    })
//Edit INPUT Admin Element Menu SATE
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
    const [sendedOrderToAdmin, setSendedOrderToAdmin] = useState([]);
//BurgerNav STATE
    const [isBurgerNavActive, setIsBurgerNavActive] = useState(false);

    const navigate = useNavigate();
    const admin = {name: "admin", password: "123"};
    
////////////////////////////////////////////////////////////
const getCurrentUserData = async () => {
    if(localStorage.getItem("admin")){
        const id = localStorage?.getItem("admin");
        const res = await axios.get(`/user/${id}`);
        const { _id, name, isUserLogged, order, isOrderSended} = res.data;
        //current user
        setIsAdminLogged(true);
        setCurrentUser({
            id: _id,
            name,
            isUserLogged,
            order,
            isOrderSended,
        });
    }
    if(!localStorage.getItem("user"))return;
    const id = localStorage?.getItem("user");
    try{
        const res = await axios.get(`/user/${id}`);
        const { _id, name, isUserLogged, order, isOrderSended} = res.data;
        //current user
        setCurrentUser({
            id: _id,
            name,
            isUserLogged,
            order,
            isOrderSended,
        });
        //items in users order
        setOrderArray(order);
    } catch(err){
        navigate("/login")
        localStorage.clear();
    }    
}
//Get registrate users
    const getUsersData = async () => {
        const { data, status } = await axios.get('/user');
        data.forEach(user => {
            setRegisteredUsersMap(registeredUsersMap.set(
                      user.name, {
                        id: user._id,
                        password: user.password,
                      }  
                )) 
        });
    }
    const getMenuData = async () => {
        const res = await axios.get("/menu_items");
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
        setMenuArray(menu);
    }
    useEffect(() => {
        getUsersData();
        getMenuData();
        getCurrentUserData();
    }, []);
/////////////////////////////
    const updateUsersOrderArray = async () => {
        if(!localStorage.getItem("user"))return;
        const id = localStorage.getItem("user")
        await axios.patch(`/user/${id}`, {
            order: orderArray,
        });           
    }
    useEffect(() => {
        updateUsersOrderArray();
    }, [orderArray]);
 //get sended to admin orders from data
    const getOrdersData = async () => {
        const res = await axios.get("/order"); 
        const orders = res.data;
        orders.map(orderItem => {
            const { _id, userName, order, date, isOrderCompleted, totalPrice } = orderItem;
                setSendedOrderToAdmin(prev => [...prev, {
                id: _id, 
                userName, 
                order, 
                date, 
                isOrderCompleted,
                totalPrice, 
            }])
        })
    }   
    useEffect(() => {
        getOrdersData();
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
function getTotalPrice(){
    if(!orderArray.length)return;
    let totalPrice = orderArray.map(el => {           
        const item = menuArray.find(item => item.id === el.id)
        return item.price * el.quantity  
    })
    totalPrice = totalPrice.reduce((acc, price) => acc += price).toFixed(2)
    return formatCurency(totalPrice);
}
    return(
        <AppContext.Provider
         value={{
            admin,
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
            sendedOrderToAdmin,
            getOrdersData,
            getCurrentUserData,
            getOrderItemsQuantity,
            decreaseItemQuantity,
            getItemQuantity,
            getTotalPrice,
            increaseItemQuantity,
            setAddMenuElement,
            setEditMenuElement,
            setIsBurgerNavActive,
            setOrderArray,
            setSendedOrderToAdmin,
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