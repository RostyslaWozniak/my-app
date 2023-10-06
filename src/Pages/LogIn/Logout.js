import React, { useContext, useEffect } from "react";
import { AppContext } from "../../Components/AppContext";
import { LoginContext } from '../../Components/LoginContext';
import Button from '../../Components/elements/Button/Button';
import './LogIn.css'
const Logout = () => {
    useEffect(() => {
        window.scrollTo({
            top: 150,
            behavior: "smooth",
        })
    }, []);
    const { handleUserLogout } = useContext(LoginContext);
    const { setOrderArray } = useContext(AppContext);
    
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