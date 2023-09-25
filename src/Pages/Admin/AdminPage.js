import React, { useContext } from 'react';
import Button from '../../Components/elements/Button/Button';
import ErrorPage from '../ErrorPage'
import { LoginContext } from '../../Components/LoginContext';
import { NavLink, Outlet } from 'react-router-dom';
import './AdminPage.css'

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

