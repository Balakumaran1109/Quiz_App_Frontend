import { createContext, useState } from "react";



const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [inputData , setInputData] = useState(null);

    const passUserData = (data) => {
        setInputData(data)                
    }
return (
    <UserContext.Provider value={{inputData, passUserData}}>
        {children}
    </UserContext.Provider>
)

}

export default UserContext