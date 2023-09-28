import React from 'react';

const ErrorPage = ({ err }) => {
    return ( 
        <div>
            <h1>Error</h1>
            <h2>{err}</h2>        
        </div>
     );
}
 
export default ErrorPage;