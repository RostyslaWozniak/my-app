import React, { useContext } from 'react';

import Input from '../../Components/elements/Input/Input';
import Button from '../../Components/elements/Button';
import './AdminPage.css'
import { AppContext } from '../../Components/AppContext';
import { LoginContext } from '../../Components/LoginContext';
import ErrorPage from '../ErrorPage'

const AdminPage = () => {
    const { 
        adminInputName,
        adminInputPrice,
        adminInputIngredients,
        handleInputValue,
        handleSubmit,
    } = useContext(AppContext);
    const { isAdminLogged } = useContext(LoginContext);
    const formInputsArray = [
        {label: "Nazwa", name: "name", type: "text", placeholder: "Wpisz nazwę...", onChange: handleInputValue, value: adminInputName},
        {label: "Cena", name: "price", type: "text", placeholder: "Wpisz cenę...", onChange: handleInputValue, value: adminInputPrice},
        {label: "Składniki", name: "ingridients", type: "text", placeholder: "Wpisz składniki...", onChange: handleInputValue, value: adminInputIngredients},
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
    if(!isAdminLogged) return <ErrorPage/>;
    return ( 
        <div className="admin-container">
            <h1>Admin</h1>
            <form onSubmit={handleSubmit}>
                {showInputs}
                <Button 
                    name="dodaj"
                    type="large"
                    />
            </form> 
        </div>
       
     );
}
export default AdminPage;

