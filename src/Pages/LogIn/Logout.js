import React, { useContext, useEffect } from "react";
import { AppContext } from "../../Components/AppContext";
import { LoginContext } from '../../Components/LoginContext';
import Button from '../../Components/elements/Button/Button';
import './LogIn.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
    useEffect(() => {
        window.scrollTo({
            top: 150,
            behavior: "smooth",
        })
    }, []);
    const { 
        setIsAdminLogged,
        isAdminLogged,
        setModal,
        currentUser,
        setCurrentUser,
        setRegisteredUsersMap,
        registeredUsersMap,
        } = useContext(LoginContext);
    const { setOrderArray } = useContext(AppContext);
    const navigate = useNavigate();
// wylogowanie użytkownika
        const handleUserLogout = async () => {
            const id = registeredUsersMap.get(currentUser).id;
            // update descriptions on backand
            const res = await axios.patch(`http://localhost:3001/api/user/${id}`, {
                isUserLogged: false,
            });
            const { name, isUserLogged,} = res.data
            setCurrentUser("User");
    //update frontend
            setRegisteredUsersMap(prevState => registeredUsersMap.set(name, {
                ...prevState.get(name),
                isUserLogged: isUserLogged,
            }));
            setModal(({
                isVisible: true,
                value: 'Jesteś wylogowany/a',
                buttons: false,
            }))
            navigate('/login');
            console.log("Wylogowanie: ", registeredUsersMap);
        }
    return ( 
        <div className="logout-container">
            <h1>Wylogowanie</h1>
            <i>Czy napewno chcesz się wylogować?</i>
                <Button
                name="Tak"
                className="large"
                onClick={() => {handleUserLogout(); setOrderArray([])} }
                />
        </div>
     );
}
 
export default Logout;