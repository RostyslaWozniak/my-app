import React, { useEffect, useState } from 'react';
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
    })
 //LOGIN MESSAGES
    const [ loginMessage, setLoginMessage] = useState(null);
 //REGISTER STATE
    const [ isUserLogged, setIsUserLogged ] = useState(false);
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
        ["Pusheen", "09876"],
        ["Rostik", "12345"],
    ]));
//LOGIN AND REGISTRATION INPUT HANDLE
    const handleInputLogin = (e, type) => {
        switch(type){
            case "login":
                return setLoginInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
            case "registration":
                return setRegisterInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
            default: return <Error err="handleInputLogin"/>
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

        // if(registerName === "") return console.log("err")
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
        // if(registerPassword === "") return console.log("err")
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
            setRegisteredUsersMap(registeredUsersMap.set(registerName, registerPassword))
            setIsUserLogged(!isUserLogged);
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
        }
    }
   
// LOGIN HANDLE FORM 
const handleLoginSubmit = (e) => {
        e.preventDefault()
        const { loginName, loginPassword } = loginInput;

        setLoginMessage(null);

        if(loginName === admin.name && loginPassword === admin.password) {
            setIsAdminLogged(!isAdminLogged);
            navigate('/admin');
            alert("jesteś zalogowany/a jako admin");
        }else if(registeredUsersMap.size > 0){
            if(registeredUsersMap.get(loginName) === loginPassword){
                alert(`${loginName} jesteś zalogowany/a `)
                setIsUserLogged(!isUserLogged);
                navigate('/');
            }else{
                setLoginInput(prevState => ({...prevState, loginPassword: ""}));
                setLoginMessage("Błedne dane logowania");
            }
        }else{
            setLoginInput(prevState => ({...prevState, loginPassword: ""}));
            setLoginMessage("Błedne dane logowania");
        }
        setLoginInput({
            loginName: "",
            loginPassword: "",
        })
    }
 
    //wylogowanie admina
    const handleAdminLogout = () => {
        setIsAdminLogged(!isAdminLogged);
        navigate('/login');
    }
    // wylogowanie użytkownika
        const handleUserLogout = () => {
            setIsUserLogged(!isUserLogged);
            console.log('jesteś wylogowany')
            navigate('/login');
        }
    return(
        <LoginContext.Provider value={{
            isAdminLogged,
            registrationMessage,
            isUserLogged,
            loginInput,
            loginMessage,
            registerInput,
            handleAdminLogout,
            handleInputLogin,
            handleLoginSubmit,
            handleRegisterSubmit,
            handleUserLogout,
        }}>
            {children}
        </LoginContext.Provider>
    )
}


