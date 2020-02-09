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
            // TODO: error
        }

        setIsLoading(false);
    };

    return (
        <main className="w-screen h-screen py-4">
            <div className="h-full flex flex-col mx-8 justify-around">
                <header className="w-full text-center pt-8 pb-8">
                    <h2 className="antialiased text-4xl uppercase tracking-tight font-extrabold">
                        scoach
                    </h2>
                </header>

                <form>
                    <input
                        className="input focus:outline-none focus:bg-white focus:border-green-500 mb-4"
                        type="email"
                        placeholder="email"
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        className="input focus:outline-none focus:bg-white focus:border-green-500 mb-8"
                        type="password"
                        placeholder="password"
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="bg-green-500 w-full rounded px-4 py-2 text-white focus:outline-none mb-2">
                        Sign In
                    </button>

                    <span className="text-gray-600 block text-center text-sm">
                        Does not have an account? Register{" "}
                        <span className="text-green-500">here</span>
                    </span>
                </form>
            </div>
        </main>
    );
};

export default Login;
