import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = (props) => {
    const {role} = useSelector(state =>{
        return{
            role: state.userReducer.role
        }
    })
    if(role === 'admin' || role === "superadmin"){
        return props.children
    }else{
        return <Navigate to = "/"/>
    }
}

export default ProtectedAdmin;