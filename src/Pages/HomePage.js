import React, { useContext } from 'react'
import { LoginContext } from '../Components/LoginContext';

const HomePage = () => {
    const { isAdminLogged, currentUser, registeredUsersMap } = useContext(LoginContext); 
    
    // let user = registeredUsersMap.has(currentUser) ? registeredUsersMap.get(currentUser) : null;
    let user = registeredUsersMap.get(currentUser);
    const panell = registeredUsersMap.has(currentUser) 
    ?
    <div>
        <i>Jesteś zalogowany</i>
        <p>{user.orderArray.length ? "Złóż zamówienie" : "Dodaj coś do koszyka"}</p>
        <p>{user.isOrderSended ? "Oczekujesz na zamówienie" : "Nie zamówione"}</p>
    </div>
    :
    <p>Jesteś nie zalogowany</p>
    return ( 
        <div>
            <h1>Home</h1>
            <h2>Siema {currentUser}</h2>
            {panell}
        </div>
     );
}
 
export default HomePage;