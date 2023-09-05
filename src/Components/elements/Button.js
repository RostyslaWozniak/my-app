import { useState } from 'react';
import './Button.css'

const Button = ({name, type, handleClick}) => {
    return ( 
        <button 
        className={type}
        onClick={handleClick}>
            {name}
        </button>
     );
}
 
export default Button;