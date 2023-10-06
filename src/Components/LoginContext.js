import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../Pages/ErrorPage'

export const LoginContext = React.createContext();
//dane admina
const admin = {name: "admin", password: "123"};

export const LoginProvider = ({children}) => {
 //NAVIGATE HOOK
    const navigate = useNavigate();
 //LOGIN STATE
    const [ isAdminLogged, setIsAdminLogged ] = useState(false);
    const [ loginInput, setLoginInput ] = useState({
        loginName: "",
        loginPassword: "",
    });
   
 //LOGIN MESSAGES
    const [ loginMessage, setLoginMessage] = useState(null);
 //REGISTER STATE
    const [ registerInput, setRegisterInput ] = useState({
        registerName: "",
        registerPassword: "",
        registerPassword2: "",
    })
 //REGISTER MESSAGES
    const [ registrationMessage, setRegistrationMessage] = useState({
        nameMessage: null,
        passwordMessage: null,
        password2Message: null,
    });
 //REGISTERED USERS STATE
    const [ registeredUsersMap, setRegisteredUsersMap ] = useState(new Map([
        ["Rostik", {
            password: "12345",
            isUserLogged: false,
            orderArray: [],
            isOrderSended: false,
        }],
        ["admin", {
            password: "123",
            isUserLogged: false,
            orderArray: [],
            isOrderSended: false,
        }],
    ]));
 //user name STATE
 const [ currentUser, setCurrentUser ] = useState("User");
 //MODAL STATE
 const [modal, setModal] = useState({
    isVisible: false,
    value: "",
    buttons: false, 
});
//LOGIN AND REGISTRATION INPUT HANDLE
    const handleInputLogin = (e, type) => {
        switch(type){
            case "login":
                return setLoginInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
            case "registration":
                return setRegisterInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
            default: return;
        }
    }
 //REGISTRATION HANDLE FORM 
    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        const { registerName, registerPassword, registerPassword2 } = registerInput;
        let isNameValid = false;
        let isPasswordValid = false;
        let isPassword2Valid = false;

        function setMessage(type, value){
            setRegistrationMessage(prevState => ({...prevState, [type]: [value]}));
        }
        setMessage("nameMessage", null);
        setMessage("passwordMessage", null);
        setMessage("password2Message", null);

        if(registerName === undefined || registerName.length < 3){
            setMessage("nameMessage", "Imię powinno mieć min 3 znaki")
        }else{
            if(registeredUsersMap.size > 0){
                if(registeredUsersMap.has(registerName)){
                    setMessage("nameMessage", "Takie imię już istnieje")
                }else {
                    isNameValid = true;        
                }
            }else{ 
                isNameValid = true;   
            }    
        }
        if(registerPassword === undefined || registerPassword < 5){
            setMessage("passwordMessage", "Hasło powinno mieć min 5 znaków")
        }else {
            isPasswordValid = true
        }
        if(registerPassword !== registerPassword2){
            setMessage("password2Message", "Hasła nie są identyczne")
        }else {
            isPassword2Valid = true  
        }

        if(isNameValid && isPasswordValid && isPassword2Valid){
            setCurrentUser(registerName)
            setRegisteredUsersMap(registeredUsersMap.set(
                registerName, {
                    password: registerPassword,
                    isUserLogged: true,
                    orderArray: [],
                    isOrderSended: false,
                }))
            navigate('/');
            setRegisterInput({
                registerName: "",
                registerPassword: "",
                registerPassword2: "",
            })
            setRegistrationMessage({
                nameMessage: null,
                passwordMessage: null,
                passwordMessage: null,
            })
            alert(`${registerName} jesteś zalogowany/a `)
            setModal(({
                isVisible: true,
                value: `Ceść ${registerName}, rejestracja udana, jesteś zalogowany/a `,
                buttons: false,
            }))
        }
    }
   
// LOGIN HANDLE FORM 
const handleLoginSubmit = (e, callback) => {
        e.preventDefault()
        const { loginName, loginPassword } = loginInput;
        setLoginMessage(null);
        if(!loginName.length || !loginPassword.length)return setLoginMessage("Wypełnij wszystkie pola pola");
        if(!registeredUsersMap.has(loginName))return setLoginMessage("Błedne dane logowania");

        if(registeredUsersMap.get(loginName).password === "123" && registeredUsersMap.get(loginName).password === loginPassword){
            setIsAdminLogged(!isAdminLogged);
            setCurrentUser(loginName);
            navigate('/admin');
            setModal(({
                isVisible: true,
                value: "Jesteś zalogowany/a jako admin",
                buttons: false,
            }))
        }else if(registeredUsersMap.size > 0){
            if(registeredUsersMap.get(loginName).password === loginPassword){
                
                setModal(({
                    isVisible: true,
                    value: `Cześć ${loginName}, jesteś zalogowany/a `,
                    buttons: false,
                }))
                setCurrentUser(loginName);
                navigate('/');
                setRegisteredUsersMap(prevState => registeredUsersMap.set(loginName, {
                    ...prevState.get(loginName),
                    isUserLogged: true,
                }));
            }else{
                setLoginInput(prevState => ({...prevState, loginPassword: ""}));
                setLoginMessage("Błedne dane logowania");
            };
        }else{
            setLoginInput(prevState => ({...prevState, loginPassword: ""}));
            setLoginMessage("Błedne dane logowania");
        };
        callback([...registeredUsersMap.get(loginName).orderArray]);
        setLoginInput(prevState => ({
            ...prevState,
            loginPassword: "",
        }));
    }
    //wylogowanie admina
    const handleAdminLogout = () => {
        setIsAdminLogged(!isAdminLogged);
        setCurrentUser("User");
        navigate('/login');
        setModal(({
            isVisible: true,
            value: 'Jesteś wylogowany/a',
            buttons: false,
        }))
    }
    // wylogowanie użytkownika
        const handleUserLogout = () => {
            setModal(({
                isVisible: true,
                value: 'Jesteś wylogowany/a',
                buttons: false,
            }))
            setRegisteredUsersMap(prevState => registeredUsersMap.set(currentUser, {
                ...prevState.get(currentUser),
                isUserLogged: false,
            }))
            setCurrentUser("User");
            navigate('/login');
        }
    return(
        <LoginContext.Provider value={{
            currentUser,
            isAdminLogged,
            registrationMessage,
            registeredUsersMap,
            loginInput,
            loginMessage,
            modal,
            registerInput,
            handleAdminLogout,
            handleInputLogin,
            handleLoginSubmit,
            handleRegisterSubmit,
            handleUserLogout,
            setModal,
            setRegisteredUsersMap,
        }}>
            {children}
        </LoginContext.Provider>
    )
}