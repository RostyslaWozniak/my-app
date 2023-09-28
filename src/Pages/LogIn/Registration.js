import React, { useContext} from 'react';
import { LoginContext } from '../../Components/LoginContext';
import Input from '../../Components/elements/Input/Input'
import Button from '../../Components/elements/Button/Button';
import './LogIn.css';

const Registration = () => {
    const { 
        handleInputLogin, 
        handleRegisterSubmit, 
        registrationMessage,
        registerInput,
    } = useContext(LoginContext);
        const { name, password, password2 } = registerInput;
        const { nameMessage, passwordMessage, password2Message } = registrationMessage;
    const formInputsArray = [
        {
            label: "Imię", 
            name: "registerName", 
            type: "text", 
            placeholder: "Wpisz imię", 
            onChange: (e) => handleInputLogin(e, "registration"), 
            value: name, 
            message: nameMessage,
        },
        {
            label: "Hasło", 
            name: "registerPassword", 
            type: "password", 
            placeholder: "Wpisz hasło", 
            onChange: (e) => handleInputLogin(e, "registration"), 
            value: password, 
            message: passwordMessage,
        },
        {
            label: "Hasło", 
            name: "registerPassword2", 
            type: "password", 
            placeholder: "Hasło jeszcze raz", 
            onChange: (e) => handleInputLogin(e, "registration"), 
            value: password2, 
            message: password2Message,
        },
    ];
    const showInputs = formInputsArray.map((input, id) => (
        <Input
            key={id}
            {...input}
        />
    ))
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
        </>
    )
}
export default Registration;