import React, { useState } from 'react';

import Button from '../../Components/elements/Button';
import './AdminPage.css'



const AdminPage = () => {
    const [inputName, setInputName] = useState("")
    const [inputPrice, setInputPrice] = useState("")
    const [inputIngridients, setInputIngridients] = useState("")

    const handleInputValue = (e) => {
        setInputName(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    
    }
    return ( 
        <div className="admin-container">
            <h1>Admin</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    <p>Nazwa:</p> 
                    <input 
                    type="text"
                    placeholder="wpisz nazwę..."
                    onChange={handleInputValue}
                    />
                </label>
                <label htmlFor="">
                    <p>Cena: </p> 
                    <input 
                    type="number"
                    placeholder="wpisz cenę..."
                    onChange={handleInputValue}
                    />
                </label>
                <label htmlFor="">
                    <p>Składniki</p>
                    <input 
                    type="text"
                    placeholder="wpisz składniki..."
                    onChange={handleInputValue}
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






