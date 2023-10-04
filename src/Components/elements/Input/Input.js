import './Input.css'

const Input = ({ 
    className, 
    label, 
    message, 
    name, 
    onChange, 
    placeholder, 
    type, 
    value, 
}) => {
    return (
        <label className="label-input-element">
            <p>{label}</p>
            <span className="reject">{message}</span>
            <input
                className={className}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                type={type} 
                value={value}
            />
        </label>
    )
}
export default Input;