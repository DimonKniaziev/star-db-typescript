import React from "react";
import { useLogin } from "../../store";

const LoginPage: React.FC = () => {
    const logIn = useLogin(state => state.logIn);
    return (
        <div>
            <p>Login to see Secret Page</p>
            <button onClick={() => logIn()}>
                Login
            </button>
        </div>
    );
}

export default LoginPage;