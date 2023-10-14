import React, { useContext, useEffect } from 'react';
import Button from '../../Components/elements/Button/Button';
import ErrorPage from '../ErrorPage'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './AdminPage.css'
import { AppContext } from '../../Context/AppContext';
import axios from 'axios';

const AdminPage = () => {
    useEffect(() => {
        window.scrollTo({
            top: 150,
            behavior: "smooth",
        })
    }, []);
    const navigate = useNavigate();
    const location = useLocation();
    const { isAdminLogged, setIsAdminLogged, setModal, currentUser, setCurrentUser } = useContext(AppContext);
    if( !localStorage.getItem("admin") ) return navigate('/login');
    const setClassAddBtn = location.pathname === "/admin/add" ? "accept" : null;
    const setClassEditBtn = location.pathname === "/admin/menu" ? "accept" : null;

    //wylogowanie admina
    const handleAdminLogout = async () => {
        const id = currentUser.id
        const res = await axios.patch(`http://localhost:3001/api/user/${id}`, {
                isUserLogged: false,
            });
        setIsAdminLogged(!isAdminLogged);
        setCurrentUser(null)
        localStorage.clear();
        navigate('/login');
        setModal(({
            isVisible: true,
            value: 'Jesteś wylogowany/a',
            buttons: false,
        }))
    }
    return (
        <div className="admin-container">
            <h1>Admin</h1>
            <div className="admin-nav">
                <Link to={"/admin/add"}>
                    <Button 
                        name="Dodaj artykuł"
                        className={`large ${setClassAddBtn}`}
                        
                    />
                </Link>
                <Link to={"/admin/menu"}>
                    <Button 
                        name="Edytuj menu"
                        className={`large ${setClassEditBtn}`}
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

