import { Navigate,useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import QuestRegisterPage from "../pages/QuestRegisterPage";
function PrivateRoutes({loggedin}){


    if(loggedin){
        const val=JSON.parse(localStorage.getItem("user"));
        
        const role= val.role;
        if(val.role=="manager"){
            return <QuestRegisterPage/>

        }
        else{
            return <Dashboard></Dashboard>
        }}
    else{
        return <Navigate to="/login"/> 
    }

}
export default PrivateRoutes;