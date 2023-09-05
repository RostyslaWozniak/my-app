import React, { useContext } from 'react';

import Button from '../../Components/elements/Button';
import './AdminPage.css'
import { AppContext } from '../../Components/AppContext';



const AdminPage = () => {
    const { 
        adminInputName,
        adminInputPrice,
        adminInputIngredients,
        handleInputValue,
        handleSubmit,
         } = useContext(AppContext);

    return ( 
        <div className="admin-container">
            <h1>Admin</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    <p>Nazwa:</p> 
                    <input 
                    name="name"
                    type="text"
                    placeholder="wpisz nazwę..."
                    onChange={handleInputValue}
                    value={adminInputName}
                    />
                </label>
                <label htmlFor="">
                    <p>Cena: </p> 
                    <input 
                    name="price"
                    type="text"
                    placeholder="wpisz cenę..."
                    onChange={handleInputValue}
                    value={adminInputPrice}
                    />
                </label>
                <label htmlFor="">
                    <p>Składniki</p>
                    <input 
                    name="ingridients"
                    type="text"
                    placeholder="wpisz składniki..."
                    onChange={handleInputValue}
                    value={adminInputIngredients}
                    />
                </label>
                <Button 
                    name="dodaj"
                    type="medium"
                    />
            </form> 
        </div>
       
     );
}
 
export default AdminPage;






