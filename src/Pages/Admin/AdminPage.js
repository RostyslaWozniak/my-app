import React, { useContext } from 'react';

import Input from '../../Components/elements/Input/Input';
import Button from '../../Components/elements/Button';
import './AdminPage.css'
import { AppContext } from '../../Components/AppContext';
import { LoginContext } from '../../Components/LoginContext';
import ErrorPage from '../ErrorPage'
import { NavLink, Outlet } from 'react-router-dom';

const AdminPage = () => {
    const { isAdminLogged, handleAdminLogout } = useContext(LoginContext);
    
    if(!isAdminLogged) return <ErrorPage/>;
    return (
        <div className="admin-container">
            <h1>Admin</h1>
            <div className="admin-nav">
                <NavLink to={"/admin/add"}>
                    <Button 
                        name="Dodaj artykuł"
                        type="large"
                    />
                </NavLink>
                <NavLink to={"/admin/edit"}>
                    <Button 
                        name="Edytuj menu"
                        type="large"
                    />
                </NavLink>
                <Button 
                    name="wyloguj się"
                    type="large delete"
                    handleClick={handleAdminLogout}
                />
            </div>
            <Outlet/>
        </div>
      
     );
}
export default AdminPage;

