import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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
    const [menuArray, setMenuArray] = useState([]);
//Order STATE
    const [orderArray, setOrderArray] = useState([])
//SEND ORDER STATE
    const [sendOrderArray, setSendOrderArray] = useState([]);
//BurgerNav STATE
    const [isBurgerNavActive, setIsBurgerNavActive] = useState(false)

////////////////////////////////////////////////////////////
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
        })
    });
    setMenuArray(menu)
}

useEffect(() => {
    getMenuData();
}, []);
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
    const handleAdminDEleteElementMenu = async (id) => {
        const cloneArray = [...menuArray];
        await axios.delete(`http://localhost:3001/api/menu_items/${id}`);
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
            sendOrderArray,
            getOrderItemsQuantity,
            decreaseItemQuantity,
            getItemQuantity,
            handleAdminDEleteElementMenu,
            handleAdminEditElementMenu,
            handleInputValue,
            handleSubmit,
            increaseItemQuantity,
            setAddMenuElement,
            setEditMenuElement,
            setIsBurgerNavActive,
            setOrderArray,
            setSendOrderArray,
            setMenuArray,
        }}
        >
            {children}
        </AppContext.Provider>
    )
}