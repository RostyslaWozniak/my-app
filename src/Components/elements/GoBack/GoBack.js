import React from "react";
import './GoBack.css';
import { useNavigate } from "react-router-dom";
const ArrowBack = ({ path }) => {
    const navigate = useNavigate();
    const navigateTo = () => {
        navigate(path);
    }
    return ( 
        <div>
            <div className="arrow-back-container" onClick={navigateTo}>
                <div className="arrow-back"></div>
            </div> 
        </div>
     );
}
 
export default ArrowBack;