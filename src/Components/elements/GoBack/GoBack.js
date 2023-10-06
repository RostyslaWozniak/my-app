import React from "react";
import './GoBack.css';
import { useNavigate } from "react-router-dom";
const ArrowBack = () => {
    const navigate = useNavigate();
    const navigateTo = () => {
        navigate(-1)
    }
    return ( 
        <div>
            <div className="arrow-back-container" onClick={navigateTo}>
                        <div className="arrow-back"></div>
                        <p>Back</p>
                    </div> 
        </div>
     );
}
 
export default ArrowBack;