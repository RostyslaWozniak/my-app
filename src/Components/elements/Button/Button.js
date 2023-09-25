import './Button.css'

const Button = ({name, type, handleClick, isDisabled}) => {
    const word = 'word'
    return ( 
        <button 
        disabled={isDisabled}
        className={type}
        onClick={handleClick}>
            {name.toUpperCase()}
        </button>
     );
}
 
export default Button;