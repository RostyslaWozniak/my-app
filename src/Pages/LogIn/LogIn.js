import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { LoginContext } from '../../Components/LoginContext';
import Input from '../../Components/elements/Input/Input';
import Button from '../../Components/elements/Button/Button';
import './LogIn.css';
import { AppContext } from '../../Components/AppContext';

const LogIn = () => {
    useEffect(() => {
        window.scrollTo({
            top: 150,
            behavior: "smooth",
        })
    }, []);
    const { loginInput, handleInputLogin, handleLoginSubmit, loginMessage } = useContext(LoginContext);
    const { setOrderArray } = useContext(AppContext);
    const { loginName, loginPassword } = loginInput;
        const formInputsArray = [
            {
                label: "Imię", 
                name: "loginName", 
                type: "text", 
                placeholder: "Wpisz imię", 
                onChange: (e) => handleInputLogin(e, "login"), 
                value: loginName,
                message: loginMessage,
            },
            {
                label: "Hasło", 
                name: "loginPassword", 
                type: "password", 
                placeholder: "Wpisz hasło", 
                onChange: (e) => handleInputLogin(e, "login"), 
                value: loginPassword,
                message: loginMessage,
            },
        ];
        const showInputs = formInputsArray.map((input, id) => (
            <Input
                key={id}
                {...input}
            />
        ))
    return(
        <div className="login-container">
            <h1>Logowanie</h1>
            <form onSubmit={(e) => handleLoginSubmit(e, setOrderArray)}>              
               {showInputs}
               <div>
                    <Link to="/login/registration"><i>Zarejestruj się</i></Link>
                    <Button 
                        type="submit"
                        name="Zaloguj się"
                        className="large accept"
                    />
                </div>
            </form>
        </div>
    )
}
export default LogIn;