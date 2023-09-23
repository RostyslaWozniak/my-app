import React, { useContext } from "react";

import { LoginContext } from '../../../Components/LoginContext';
import Button from '../../../Components/elements/Button';
import './Logout.css'
const Logout = () => {
    const { handleUserLogout } = useContext(LoginContext);
    return ( 
        <div className="logout-container">
            <h1>Wylogowanie</h1>
            <i>Czy napewno chcesz się wylogować?</i>
                <Button
                name="Tak"
                type="large"
                handleClick={handleUserLogout}
                />
        </div>
     );
}
 
export default Logout;