import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ err }) => {
    useEffect(() => {
        window.scrollTo({
            top: 150,
        })
    }, []);
    const navigate = useNavigate()
    setTimeout(() => navigate("/login"), 1000);
    return ( 
        <div>
            <h1>Error</h1>
            <h2>{err}</h2>        
        </div>
     );
}
 
export default ErrorPage;