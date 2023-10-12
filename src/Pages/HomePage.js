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