import React, { useContext } from 'react';
import { AppContext } from '../../Components/AppContext';
import Button from '../../Components/elements/Button/Button';
import Input from '../../Components/elements/Input/Input';
import './AdminPage.css'

const AddArticle = () => {
    const { 
        adminInputName,
        adminInputPrice,
        adminInputIngredients,
        adminInputKategory,
        handleInputValue,
        handleSubmit,
    } = useContext(AppContext);
    
    const formInputsArray = [
        {label: "Nazwa", name: "name", type: "text", placeholder: "Wpisz nazwę...", onChange: handleInputValue, value: adminInputName},
        {label: "Cena", name: "price", type: "text", placeholder: "Wpisz cenę...", onChange: handleInputValue, value: adminInputPrice},
        {label: "Składniki", name: "ingridients", type: "text", placeholder: "Wpisz składniki...", onChange: handleInputValue, value: adminInputIngredients},
        {label: "Kategoria", name: "kategory", type: "text", placeholder: "Wpisz kategorie...", onChange: handleInputValue, value: adminInputKategory},
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
    return ( 
        <>
            <h2>Dodaj Artykuł</h2>
            <form onSubmit={handleSubmit}>
                {showInputs}
                <Button 
                    name="dodaj"
                    type="large accept"
                />
            </form> 
        </>
     );
}
 
export default AddArticle;