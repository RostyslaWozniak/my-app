import React, { useContext, useEffect } from 'react';
import { AppContext } from '../Context/AppContext';

const HomePage = () => {
    useEffect(() => {
        
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }, []);
    const { isAdminLogged, currentUser, registeredUsersMap } = useContext(AppContext); 
    

   
    const panell = registeredUsersMap.has(currentUser?.name) 
    ?
    <div>
        <h3>Jesteś zalogowany</h3>
        {
            !isAdminLogged
            &&
            <>
                <h3>{currentUser.order.length === 0 && "Złóż zamówienie"}</h3>
                <h3>{currentUser.isOrderSended && "Oczekujesz na zamówienie"}</h3>
            </>
        }
        
    </div>
    :
    <h3>Zaloguj się zeby złozyć zamówienie</h3>
    return ( 
        <div>
            <h1>Home</h1>
            <h2>{isAdminLogged ? (`Siema ${currentUser?.name}`) : (`Cześć ${currentUser?.name || "User"}`)}</h2>
            {panell}
        </div>
     );
}
 
export default HomePage;