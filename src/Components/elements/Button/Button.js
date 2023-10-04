import './Button.css'

const Button = ({id, name, type = "button", className, onClick, isDisabled }) => {
    return ( 
        <button 
        id={id}
        type={type}
        disabled={isDisabled}
        className={className}
        onClick={onClick}>
            {name.toUpperCase()}
        </button>
     );
}
export default Button;