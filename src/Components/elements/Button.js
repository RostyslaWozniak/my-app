import { useState } from 'react';
import './Button.css'

const Button = ({name, type, handleClick, isDisabled}) => {
    return ( 
        <button 
        disabled={isDisabled}
        className={type}
        onClick={handleClick}>
            {name}
        </button>
     );
}
 
export default Button;