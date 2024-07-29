import { Navigate } from "react-router-dom";

export default function PrivateRoute({user, children}) {
    if(user === null) {
        return <Navigate to="/signin" replace />;
    }    
    return children;
}