import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { LoginContext } from '../../Components/LoginContext';
import Input from '../../Components/elements/Input/Input';
import Button from '../../Components/elements/Button/Button';
import './LogIn.css';

const LogIn = () => {
    const { nameInput, passwordInput, handleInputLoginValue, handleLoginSubmit } = useContext(LoginContext);
        
        const formInputsArray = [
            {label: "Imię", name: "loginName", type: "text", placeholder: "Wpisz imię", onChange: handleInputLoginValue, value: nameInput},
            {label: "Hasło", name: "loginPassword", type: "password", placeholder: "Wpisz hasło", onChange: handleInputLoginValue, value: passwordInput},
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
        <div className="login-container">
            <h1>Logowanie</h1>
            <form onSubmit={handleLoginSubmit}>              
               {showInputs}
               <div>
                    <Link to="/login/registration"><i>Zarejestruj się</i></Link>
                    <Button 
                        type="submit"
                        name="Zaloguj się"
                        className="large"
                    />
                </div>
            </form>
        </div>
    )
}
export default LogIn;