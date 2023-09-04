import { useState } from 'react';
import './Button.css'

const Button = ({name, type, }) => {
 
    
    const handleClick = () => {
        console.log("click")
    }

    return ( 
        <button 
        className={type}
        onClick={handleClick}>
            {name}
        </button>
     );
}
 
export default Button;