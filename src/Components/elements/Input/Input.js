import './Input.css'

const Input = ({ label, name, type, placeholder, onChange, value, className, message }) => {

    
    return (
        <label className="label-input-element">
            <p>{label}</p>
            <span className="reject">{message}</span>
            <input
                name={name}
                type={type} 
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={className}
            />
        </label>
    )
}
export default Input;