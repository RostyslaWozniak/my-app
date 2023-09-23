import React, { useContext} from 'react';
import { LoginContext } from '../../../Components/LoginContext';
import Input from '../../../Components/elements/Input/Input'
import Button from '../../../Components/elements/Button';
import './Registration.css';

const Registration = () => {
    const { handleInputLoginValue, 
        handleRegisterSubmit, 
        registerNameInput,
        registerPasswordInput,
        registerPasswordInput2, } = useContext(LoginContext);
    
    const formInputsArray = [
        {label: "Imię", name: "registerName", type: "text", placeholder: "Wpisz imię", onChange: handleInputLoginValue, value: registerNameInput},
        {label: "Hasło", name: "registerPassword", type: "password", placeholder: "Wpisz hasło", onChange: handleInputLoginValue, value: registerPasswordInput},
        {label: "Hasło", name: "registerPassword2", type: "password", placeholder: "Wpisz ponownie", onChange: handleInputLoginValue, value: registerPasswordInput2},
    ];
    const showInputs = formInputsArray.map((input, id) => (
        <Input
            key={id}
            label={input.label}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            onChange={input.onChange}   
            value={input.value}
        />
    ))
    return(
        <>
            <h1>Rejestracja</h1>
            <form className="registration-container" onSubmit={handleRegisterSubmit} noValidate >
                {showInputs}
                <Button
                    name="Zarejestruj się"
                    type="large accept"
                />
            </form>
        </>
    )
}
export default Registration;