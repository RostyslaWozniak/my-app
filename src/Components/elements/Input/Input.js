import './Input.css'

const Input = ({ label, name, type, placeholder, onChange, value }) => {

    
    return (
        <label className="label-input-element">
            <p>{label}</p>
            <input
                name={name}
                type={type} 
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </label>
    )
}
export default Input;