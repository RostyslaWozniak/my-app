import './Button.css'

const Button = ({name, type = "button", className, onClick, isDisabled }) => {
    const word = 'word'
    return ( 
        <button 
        type={type}
        disabled={isDisabled}
        className={className}
        onClick={onClick}>
            {name.toUpperCase()}
        </button>
     );
}
 
export default Button;