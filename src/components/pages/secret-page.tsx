import React from "react";
import { useLogin } from "../../store";
import { Navigate } from "react-router-dom";

const SecretPage: React.FC = () => {
    const isLoggedIn = useLogin(state => state.isLoggedIn)
    if(!isLoggedIn) {
        return <Navigate to="/login"/>
    }
    return (
        <div>
            <h3>This Page is Full of Secrets!</h3>
        </div>
    );
}
export default SecretPage;