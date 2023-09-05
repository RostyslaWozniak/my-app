import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import MenuPage from '../Pages/Menu/MenuPage';
import OrderPage from '../Pages/OrderPage';
import AdminPage from '../Pages/Admin/AdminPage';
import ErrorPage from '../Pages/ErrorPage';



const Pages = () => {
    return ( 
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/menu" element={<MenuPage/>}/>
            <Route path="/order" element={<OrderPage/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
     );
}
 
export default Pages;
