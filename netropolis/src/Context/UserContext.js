import { createContext,useContext,useEffect,useState } from "react";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    
    function loginUser(user){
        setUser(user.userid);
    }
    function logoutUser(){
        setUser(null);
        localStorage.removeItem("user");
    }
    return(
        <UserContext.Provider value={{user,loginUser,logoutUser}}>
            {children}
        </UserContext.Provider>
    )

}


export const useUser=()=>useContext(UserContext);

