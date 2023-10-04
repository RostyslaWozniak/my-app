import React, { useContext } from 'react';
import Button from '../../Components/elements/Button/Button';
import ErrorPage from '../ErrorPage'
import { LoginContext } from '../../Components/LoginContext';
import { Link, Outlet } from 'react-router-dom';
import './AdminPage.css'

const AdminPage = () => {
    const { isAdminLogged, handleAdminLogout } = useContext(LoginContext);
    console.log()
    if(!isAdminLogged) return <ErrorPage err="Nie masz dostępu do Admin"/>;
    return (
        <div className="admin-container">
            <h1>Admin</h1>
            <div className="admin-nav">
                <Link to={"/admin/add"}>
                    <Button 
                        name="Dodaj artykuł"
                        className="large"
                    />
                </Link>
                <Link to={"/admin/menu"}>
                    <Button 
                        name="Edytuj menu"
                        className="large"
                    />
                </Link>
                <Button 
                    name="wyloguj się"
                    className="large delete"
                    onClick={handleAdminLogout}
                />
            </div>
            <Outlet/>
        </div>
     );
}
export default AdminPage;

