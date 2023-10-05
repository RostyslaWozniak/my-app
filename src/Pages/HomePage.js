import React, { useContext } from 'react';
import Modal from '../Components/elements/Modal/Modal'
import { LoginContext } from '../Components/LoginContext';

const HomePage = () => {
    const { isAdminLogged, currentUser, registeredUsersMap } = useContext(LoginContext); 
    let user = registeredUsersMap.get(currentUser);
    const panell = registeredUsersMap.has(currentUser) 
    ?
    <div>
        <h3>Jesteś zalogowany</h3>
        {
            !isAdminLogged
            &&
            <>
                <h3>{user.orderArray.length === 0 && "Złóż zamówienie"}</h3>
                <h3>{user.isOrderSended && "Oczekujesz na zamówienie"}</h3>
            </>
        }
        
    </div>
    :
    <h3>Zaloguj się zeby złozyć zamówienie</h3>
    return ( 
        <div>
            <h1>Home</h1>
            <h2>{isAdminLogged ? (`Siema ${currentUser}`) : (`Cześć ${currentUser}`)}</h2>
            {panell}
        </div>
     );
}
 
export default HomePage;