import React from "react";
import axios from "axios";

export const GetDataContext = React.createContext();

export const DataProvider = ({children}) => {

    const getUserData = async () => {
        const res = await axios.get("http://localhost:3000/api/user");
        
    }

    
    
    return ( 
        <GetDataContext.Provider value={{
        
            getUserData,
        }}>
            {children}
        </GetDataContext.Provider>
     );
}
 
