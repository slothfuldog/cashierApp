import { Navigate } from "react-router-dom";

const ProtectedLogin = (props) => {
    const getLocalStorage = localStorage.getItem("cashier_login")
    if(getLocalStorage){
            return props.children
        }
        else{
            return(<Navigate to = '/login' />)
        }
}

export default ProtectedLogin;