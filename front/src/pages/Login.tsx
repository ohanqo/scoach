import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";
import { StoreContext } from "../store/context";
import TYPES from "../store/types";

const Login: React.FC = () => {
    const history = useHistory();
    const { dispatch } = useContext(StoreContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const login = async () => {
        setIsLoading(true);

        try {
            const {
                user,
                access_token,
            } = await AuthService.getInstance().login(email, password);
            localStorage.setItem("access_token", access_token);
            dispatch({ type: TYPES.SET_USER, payload: user });
        } catch (error) {
            
        }

        setIsLoading(false);
    };

    return (
        <div>
            <input
                type="email"
                placeholder="email"
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
            />
            <button disabled={isLoading} onClick={() => login()}>
                Connect
            </button>
            <button onClick={() => history.push("/register")}>Register</button>
        </div>
    );
};

export default Login;
