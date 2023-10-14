import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Input from '../../Components/elements/Input/Input';
import Button from '../../Components/elements/Button/Button';
import './LogIn.css';
import { AppContext } from '../../Context/AppContext';



const LogIn = () => {
    useEffect(() => {
        window.scrollTo({
            top: 150,
            behavior: "smooth",
        })
    }, []);
    const {
        admin,
        isAdminLogged,
        loginInput, 
        loginMessage,
        registeredUsersMap, 
        setCurrentUser,
        setIsAdminLogged,
        setLoginInput,
        setLoginMessage, 
        setModal,
        setOrderArray,
     } = useContext(AppContext);
    const navigate = useNavigate();
    const { loginName, loginPassword } = loginInput;
//LOGIN INPUT HANDLE
    const handleInputLogin = e => {
        return setLoginInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }
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
 //Handle login form
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const { loginName, loginPassword } = loginInput;
        setLoginMessage(null);
        if(!loginName.length || !loginPassword.length)return setLoginMessage("Wypełnij wszystkie pola pola");
        if(!registeredUsersMap.has(loginName))return setLoginMessage("Błedne dane logowania");
        //Admin login
        if(registeredUsersMap.get(admin.name).password === loginPassword){
            const id = registeredUsersMap.get(admin.name).id;
            const res = await axios.patch(`http://localhost:3001/api/user/${id}`, {
                isUserLogged: true, 
            });
            const { _id, name, isUserLogged, order, isOrderSended } = res.data;
            setCurrentUser({
                id: _id,
                name,
                isUserLogged,
                order,
                isOrderSended,      
            });
            localStorage.setItem("admin", id);
            setIsAdminLogged(!isAdminLogged);
            navigate('/admin');
            setModal(({
                isVisible: true,
                value: "Jesteś zalogowany/a jako admin",
                buttons: false,
            }))
        //user login
        }else if(registeredUsersMap.size){
            if(registeredUsersMap.get(loginName).password === loginPassword){
                
        //set user status on backend
                const id = registeredUsersMap.get(loginName).id
                const res = await axios.patch(`http://localhost:3001/api/user/${id}`, {
                isUserLogged: true,
            });
         //set current user
         const { _id, name, isUserLogged, order, isOrderSended } = res.data;
            setCurrentUser({
                id: _id,
                name,
                isUserLogged,
                order,
                isOrderSended,      
            });
         //users order 
            setOrderArray(order);
            localStorage.setItem("user", id);
        //show modal            
                setModal(({
                    isVisible: true,
                    value: `Cześć ${loginName}, jesteś zalogowany/a `,
                    buttons: false,
                }));
                setLoginInput(prevState => ({
                    ...prevState,
                    loginPassword: "",
                }));
                navigate('/');
            }else{
                setLoginInput(prevState => ({...prevState, loginPassword: ""}));
                setLoginMessage("Błedne dane logowania");
            };
        }else{
            setLoginInput(prevState => ({...prevState, loginPassword: ""}));
            setLoginMessage("Błedne dane logowania");
        };
    };
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