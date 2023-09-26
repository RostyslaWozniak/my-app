import React, { useContext } from "react";
import { LoginContext } from '../../Components/LoginContext';
import Button from '../../Components/elements/Button/Button';
import './LogIn.css'
const Logout = () => {
    const { handleUserLogout } = useContext(LoginContext);
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