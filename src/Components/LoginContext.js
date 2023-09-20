import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const LoginContext = React.createContext();
//dane admina
const admin = {name: "admin", password: "123"}


export const LoginProvider = ({children}) => {
 //navigate hook
    const navigate = useNavigate();
 //stan logowania
    const [ isAdminLogged, setIsAdminLogged ] = useState(false);
    const [ nameInput, setNameInput ] = useState("");
    const [ passwordInput, setPasswordInput ] = useState("");
 //stan rejestracji
    const [ isUserLogged, setIsUserLogged ] = useState(false);
    const [ registerNameInput, setRegisterNameInput ] = useState("");
    const [ registerPasswordInput, setRegisterPasswordInput ] = useState("");
    const [ registerPasswordInput2, setRegisterPasswordInput2 ] = useState("");
    const [ arrOfRegistrateUsers, setArrOfRegistrateUsers ] = useState([]);
 //obsługa inputów Logowania oraz rejestracji 
    const handleInputLoginValue = (e) => {
        switch (e.target.name) {
            case 'loginName':
                return setNameInput(e.target.value);
            case 'loginPassword':
                return setPasswordInput(e.target.value);
            case 'registerName':
                return setRegisterNameInput(e.target.value);
            case'registerPassword':
                return setRegisterPasswordInput(e.target.value);
            case'registerPassword2':
                return setRegisterPasswordInput2(e.target.value);
            default: return console.log('err');
        }
    }
 //obsługa formularza Logowania
    const handleLoginSubmit = (e) => {
        e.preventDefault()
        if(nameInput === admin.name && passwordInput === admin.password) {
            setIsAdminLogged(!isAdminLogged);
            navigate('/admin');
        }else if(arrOfRegistrateUsers > 0){
            arrOfRegistrateUsers.forEach(user => {
                if(nameInput === user.name && passwordInput === user.password){
                    console.log(`${nameInput} jesteś zalogowany `)
                }else{
                    console.log('Błedne dane logowania')
                }
            })
        }else{
            console.log('Błedne dane logowania')
        }
         
        setNameInput("");
        setPasswordInput("");
    }
 //obsługa formularza rejestracji 
    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        let isNameValid = false;
        let isPasswordValid = false;
        let isPassword2Valid = false;
        if(registerNameInput.length < 3){
            console.log('imię powinno mieć min 3 znaki')
        }else{
            if(arrOfRegistrateUsers.length > 0){
                arrOfRegistrateUsers.forEach(user => {
                    if(user.name === registerNameInput){
                         console.log('Takie imię już istnieje');
                    }else {
                        isNameValid = true;
                        console.log(`${user.name} jesteś zalogowany `)
                    }
                })
            }else{
                isNameValid = true;
                console.log(`${registerNameInput} jesteś zalogowany `)
            }    
        }
        if(registerPasswordInput.length < 5){
            console.log('hasło powinne mieć min 5 znaków')
        }else {
            isPasswordValid = true;
        }
        if(registerPasswordInput !== registerPasswordInput2){
           console.log('hasła nie są identyczne')
        }else {
            isPassword2Valid = true;
        }
        if(isNameValid && isPasswordValid && isPassword2Valid){
            setArrOfRegistrateUsers(prevState => {
                return [...prevState, {name: registerNameInput, password: registerPasswordInput}]
            } )
            setIsUserLogged(!isUserLogged);
            navigate('/');
            setRegisterNameInput("");
            setRegisterPasswordInput("");
            setRegisterPasswordInput2("");
        }
    }
    // wylogowanie użytkownika
        const handleUserLogout = () => {
            setIsUserLogged(!isUserLogged);
            console.log('jesteś wylogowany')
            navigate('/');
        }
    return(
        <LoginContext.Provider value={{
            isUserLogged,
            isAdminLogged,
            nameInput,
            passwordInput,
            registerNameInput,
            registerPasswordInput,
            registerPasswordInput2,
            handleInputLoginValue,
            handleLoginSubmit,
            handleRegisterSubmit,
            handleUserLogout,
        }}>
            {children}
        </LoginContext.Provider>
    )
}
