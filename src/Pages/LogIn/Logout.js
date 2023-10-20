import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import Button from '../../Components/elements/Button/Button';
import './LogIn.css'
import { useNavigate } from "react-router-dom";
import axios from "../../tools/axiosTool";

const Logout = () => {
    const { 
        setModal,
        currentUser,
        setCurrentUser,
        setOrderArray,
        } = useContext(AppContext);
    const navigate = useNavigate();
// wylogowanie użytkownika
        const handleUserLogout = async () => {
            const id = currentUser.id;
            // update descriptions on backand
            const res = await axios.patch(`/user/${id}`, {
                isUserLogged: false,
            });
            //update frontend
            localStorage.removeItem("user");
            setCurrentUser(null);
            setModal(({
                isVisible: true,
                value: 'Jesteś wylogowany/a',
                buttons: false,
            }));
            setOrderArray([]);
            navigate('/login');
        }
    return ( 
        <div className="logout-container">
            <h1>Wylogowanie</h1>
            <i>Czy napewno chcesz się wylogować?</i>
                <Button
                name="Tak"
                className="large"
                onClick={handleUserLogout}
                />
        </div>
     );
}
 
export default Logout;