import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginContext = React.createContext();
//dane admina
const admin = {name: "admin", password: "123"};

export const LoginProvider = ({children}) => {
 //LOGIN STATE
 const [ isAdminLogged, setIsAdminLogged ] = useState(false);
 const [ loginInput, setLoginInput ] = useState({ loginName: "", loginPassword: "" });
//LOGIN MESSAGES
 const [ loginMessage, setLoginMessage] = useState(null);
 //REGISTERED USERS STATE
const [ registeredUsersMap, setRegisteredUsersMap ] = useState(new Map());
 //user name STATE
 const [ currentUser, setCurrentUser ] = useState("User");
 console.log(currentUser)
 //MODAL STATE
 const [modal, setModal] = useState({
    isVisible: false,
    value: null,
    buttons: false, 
});
//Get registrate users
    const getUsersData = async () => {
        const res = await axios.get('http://localhost:3001/api/user')
        const users = [...res.data]
        users.forEach(user => {
            setRegisteredUsersMap(registeredUsersMap.set(
                      user.name, {
                        id: user._id,
                        password: user.password,
                        isUserLogged: user.isUserLogged,
                        orderArray: user.orderArray,
                        isOrderSended: user.isOrderSended,
                      }  
                )) 
        });
        // console.log("Pobieranie data", registeredUsersMap)
    }

    useEffect(() => {
        getUsersData();
    }, [])
    return(
        <LoginContext.Provider value={{
            currentUser,
            isAdminLogged,
            registeredUsersMap,
            loginInput,
            loginMessage,
            modal,
            setLoginMessage,
            setLoginInput,
            setModal,
            setRegisteredUsersMap,
            setCurrentUser,
            setIsAdminLogged,
        }}>
            {children}
        </LoginContext.Provider>
    )
}