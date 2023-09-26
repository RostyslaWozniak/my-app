import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import MenuPage from '../Pages/Menu/MenuPage';
import OrderPage from '../Pages/Order/OrderPage';
import AdminPage from '../Pages/Admin/AdminPage';
import LogIn from '../Pages/LogIn/LogIn';
import Logout from '../Pages/LogIn/Logout';
import Registration from '../Pages/LogIn/Registration'
import ErrorPage from '../Pages/ErrorPage';
import BurgerNav from './elements/BurgerNav/BurgerNav';
import AddArticle from '../Pages/Admin/AddArticle';
import EditMenu from '../Pages/Admin/EditMenu'; 
import EditMenuElement from '../Pages/Admin/EditMenuElement';

const Pages = () => {
    return ( 
        <>
        <BurgerNav/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/menu" element={<MenuPage/>}/>
            <Route path="/order" element={<OrderPage/>}/>

            <Route path="/admin" element={<AdminPage/>}>
                <Route path="add" element={<AddArticle/>}/>
                <Route path="menu" element={<EditMenu/>}/>
                <Route path="menu/edit" element={<EditMenuElement/>}/>
            </Route>

            <Route path="/login">
                <Route index element={<LogIn/>}/>
                <Route path="registration" element={<Registration/>}/>
            </Route>
            <Route path="/logout" element={<Logout/>}/>
            
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
        </>
     );
}
export default Pages;