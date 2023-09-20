import React, { useContext } from "react";

import { LoginContext } from '../../../Components/LoginContext';
import Button from '../../../Components/elements/Button'
const Logout = () => {
    const { handleUserLogout } = useContext(LoginContext);
    return ( 
        <>
            <h1>Wylogowanie</h1>
            <p>Czy napewno chcesz się wylogować</p>
                <Button
                name="Tak"
                type="large"
                handleClick={handleUserLogout}
                />
        </>
     );
}
 
export default Logout;