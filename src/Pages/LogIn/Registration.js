import React, { useContext, useEffect, useState} from 'react';
import { AppContext } from '../../Context/AppContext';
import Input from '../../Components/elements/Input/Input'
import Button from '../../Components/elements/Button/Button';
import './LogIn.css';
import ArrowBack from '../../Components/elements/GoBack/GoBack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
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
    useEffect(() => {
        window.scrollTo({
            top: 150,
            behavior: "smooth",
        });
        setRegistrationMessage({
            nameMessage: null,
            passwordMessage: null,
            password2Message: null,
        });
    }, []);
    const { 
        registeredUsersMap,
        setCurrentUser,
        setModal,
        setRegisteredUsersMap,
    } = useContext(AppContext);
        const { name, password, password2 } = registerInput;
        const { nameMessage, passwordMessage, password2Message } = registrationMessage;
        const handleInputLogin = e => {
            return setRegisterInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
        }
    const formInputsArray = [
        {
            label: "Imię", 
            name: "registerName", 
            type: "text", 
            placeholder: "Wpisz imię", 
            onChange: handleInputLogin, 
            value: name, 
            message: nameMessage,
        },
        {
            label: "Hasło", 
            name: "registerPassword", 
            type: "password", 
            placeholder: "Wpisz hasło", 
            onChange: handleInputLogin, 
            value: password, 
            message: passwordMessage,
        },
        {
            label: "Hasło", 
            name: "registerPassword2", 
            type: "password", 
            placeholder: "Hasło jeszcze raz", 
            onChange: handleInputLogin, 
            value: password2, 
            message: password2Message,
        },
    ];
     
    const navigate = useNavigate();

    const showInputs = formInputsArray.map((input, id) => (
        <Input
            key={id}
            {...input}
        />
    ))
    
    
    //REGISTRATION HANDLE FORM 
    const handleRegisterSubmit = async (e) => {
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
        if(!registerName.length || registerName.length < 3){
            setMessage("nameMessage", "Imię powinno mieć min 3 znaki")
        }else{
            if(registeredUsersMap.size > 0){
                if(registeredUsersMap.has(registerName)){
                    setMessage("nameMessage", "Takie imię już istnieje");
                    isNameValid = false;
                }else {
                    isNameValid = true;        
                }
            }else{ 
                isNameValid = true;   
            }    
        }
        if(!registerPassword.length || registerPassword.length < 5 ){ 
            setMessage("passwordMessage", "Hasło powinno mieć min 5 znaków");
            isPasswordValid = false;
        }else {
            isPasswordValid = true;
            console.log(registerPassword)
        }
        if(registerPassword !== registerPassword2){
            setMessage("password2Message", "Hasła nie są identyczne");
            isPassword2Valid = false;
        }else {
            isPassword2Valid = true; 
        }

        if(isNameValid && isPasswordValid && isPassword2Valid){
            setCurrentUser(registerName);
            //add registration data to backend
            const res = await axios.post('http://localhost:3001/api/user', {
                name: registerName,
                password: registerPassword,
                isUserLogged: true,
                orderArray: [],
                isOrderSended: false, 
            });
            //update registration data on frontend
            const { name, _id, password, isUserLogged, orderArray, isOrderSended} = res.data
            setRegisteredUsersMap(registeredUsersMap.set(
                name, {
                    id: _id,
                    password,
                    isUserLogged,
                    orderArray,
                    isOrderSended,
                }))
            navigate('/');
            setRegisterInput({
                registerName: "",
                registerPassword: "",
                registerPassword2: "",
            });
            setModal(({
                isVisible: true,
                value: `Ceść ${registerName}, rejestracja udana, jesteś zalogowany/a `,
                buttons: false,
            }))
        }
    }
    return(
        <>
            <h1>Rejestracja</h1>
            <form className="registration-container" onSubmit={handleRegisterSubmit} noValidate >
                {showInputs}
                <Button
                    type="submit"
                    name="Zarejestruj się"
                    className="large accept"
                />
            </form>
            <ArrowBack/>
        </>
    )
}
export default Registration;