import React, { useEffect, useState } from "react";
import { SUCCESS_REGISTER_MESSAGE } from "../../shared/constants";
import { httpWrapper } from "../../shared/http";
import { Role } from "../../shared/models/User";
import router from "../../shared/router";
import snackbar from "../../shared/utils/snackbar";
import { isEmail } from "../../shared/utils/validations";
import AuthService from "../AuthService";
import RegisterRequest from "./dto/RegisterRequest";

const Register: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordValidation, setPasswordValidation] = useState("");
    const [role, setRole] = useState(Role.CUSTOMER);

    const [isNameValid, setIsNameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const register = async () => {
        setIsLoading(true);

        httpWrapper(async () => {
            const payload: RegisterRequest = { name, email, password, role };
            await AuthService.getInstance().register(payload);
            router.replace("/login");
            snackbar.success(SUCCESS_REGISTER_MESSAGE);
        });

        setIsLoading(false);
    };

    useEffect(() => {
        setIsNameValid(name.trim().length > 0);
    }, [name]);

    useEffect(() => {
        setIsEmailValid(isEmail(email));
    }, [email]);

    useEffect(() => {
        const isPasswordValid =
            password === passwordValidation && password.length > 5;
        setIsPasswordValid(isPasswordValid);
    }, [password, passwordValidation]);

    useEffect(() => {
        setIsFormValid(isNameValid && isEmailValid && isPasswordValid);
    }, [isNameValid, isEmailValid, isPasswordValid]);

    return (
        <main className="w-screen min-h-screen py-4">
            <div className="h-full flex flex-col mx-16 justify-around">
                <header className="w-full text-center pt-8 pb-8">
                    <img
                        src="/assets/images/logo.svg"
                        alt="SCOACH Logo"
                        className="h-24 mx-auto mb-2"
                    />
                    <h2 className="antialiased text-gray-200 font-bold">
                        Register to Scoach
                    </h2>
                </header>

                <form className="flex flex-col">
                    <input
                        placeholder="name"
                        className="input relative text-gray-200 focus:outline-none mb-4"
                        key="name"
                        type="text"
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        placeholder="email address"
                        className="input relative text-gray-200 focus:outline-none mb-8"
                        key="email"
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        placeholder="password"
                        className="input relative text-gray-200 focus:outline-none mb-4"
                        key="password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />

                    <input
                        placeholder="password confirmation"
                        className="input relative text-gray-200 focus:outline-none mb-8"
                        key="password-confirmation"
                        type="password"
                        onChange={e => setPasswordValidation(e.target.value)}
                    />

                    <div className="flex flex-col md:flex-row md:justify-between mb-8">
                        <div
                            className={`bg-primary-400 duration-500 ease-in-out h-28 cursor-pointer hover:-translate-y-1 md:flex-1 px-4 py-2 rounded-lg text-gray-300 transform transition-all w-full ${
                                role === Role.CUSTOMER
                                    ? "opacity-100"
                                    : "opacity-50"
                            }`}
                            onClick={e => setRole(Role.CUSTOMER)}
                        >
                            <div className="text-lg font-bold">
                                I'm a customer
                            </div>

                            <div>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Eos, nam!
                            </div>
                        </div>

                        <span className="my-2 md:my-0 md:mx-2"></span>

                        <div
                            className={`bg-primary-400 duration-500 ease-in-out h-28 cursor-pointer hover:-translate-y-1 md:flex-1 opacity-50 px-4 py-2 rounded-lg text-gray-300 transform transition-all w-full ${
                                role === Role.COACH
                                    ? "opacity-100"
                                    : "opacity-50"
                            }`}
                            onClick={e => setRole(Role.COACH)}
                        >
                            <div className="text-lg font-bold">I'm a coach</div>

                            <div>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Eos, nam!
                            </div>
                        </div>
                    </div>

                    <button
                        disabled={!isFormValid}
                        type="button"
                        className="block duration-300 ease-in-out capitalize text-gray-200 text-xl px-4 py-2 rounded-lg bg-primary-400 disabled:opacity-25 mb-16 w-full opacity-100 transition-all transform hover:-translate-y-1 focus:outline-none"
                        onClick={() => register()}
                    >
                        {isLoading ? (
                            <i className="fas fa-circle-notch fa-spin" />
                        ) : (
                            "Let's sign up"
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Register;
