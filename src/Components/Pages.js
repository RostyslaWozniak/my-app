import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddOrEditArticle from '../Pages/Admin/AddOrEditArticle';
import AdminInfo from '../Pages/Admin/AdminInfo';
import AdminPage from '../Pages/Admin/AdminPage';
import ScrollUp from './elements/ScrollUp/ScrollUp';
import BurgerNav from './elements/BurgerNav/BurgerNav';
import EditMenu from '../Pages/Admin/EditMenu'; 
import ErrorPage from '../Pages/ErrorPage';
import HomePage from '../Pages/HomePage';
import LogIn from '../Pages/LogIn/LogIn';
import Logout from '../Pages/LogIn/Logout';
import MenuPage from '../Pages/Menu/MenuPage';
import OrderPage from '../Pages/Order/OrderPage';
import Registration from '../Pages/LogIn/Registration'
import Cart from './elements/Cart/Cart';

const Pages = () => {
    return ( 
        <>
        <ScrollUp/>
        <BurgerNav/>
        <Cart/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/menu" element={<MenuPage/>}/>
            <Route path="/order" element={<OrderPage/>}/>
            <Route path="/admin" element={<AdminPage/>}>
                <Route index element={<AdminInfo/>}/>
                <Route path="add" element={<AddOrEditArticle type="add"/>}/>
                <Route path="menu" element={<EditMenu/>}/>
                <Route path="menu/edit" element={<AddOrEditArticle type="edit"/>}/>
            </Route>
            <Route path="/login">
                <Route index element={<LogIn/>}/>
                <Route path="registration" element={<Registration/>}/>
            </Route>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="*" element={<ErrorPage err="Niema takiej strony"/>}/>
        </Routes>
        </>
     );
}
export default Pages;