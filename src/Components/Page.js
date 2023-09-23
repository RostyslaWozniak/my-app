import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import MenuPage from '../Pages/Menu/MenuPage';
import OrderPage from '../Pages/Order/OrderPage';
import AdminPage from '../Pages/Admin/AdminPage';
import LogIn from '../Pages/LogIn/LogIn';
import Logout from '../Pages/LogIn/Logout/Logout';
import Registration from '../Pages/LogIn/Registration/Registration'
import ErrorPage from '../Pages/ErrorPage';
import BurgerNav from './elements/BurgerNav/BurgerNav';

const Pages = () => {
    return ( 
        <>
        <BurgerNav/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/menu" element={<MenuPage/>}/>
            <Route path="/order" element={<OrderPage/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/login/registration" element={<Registration/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
        </>
     );
}
export default Pages;