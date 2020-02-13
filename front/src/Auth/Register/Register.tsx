import React, { useState } from "react";
import RegisterRequest from "./dto/RegisterRequest";
import { Role } from "../../shared/models/User";
import AuthService from "../AuthService";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [passwordValidation, setPasswordValidation] = useState("");
    const [role, setRole] = useState(Role.CUSTOMER);
    const [isLoading, setIsLoading] = useState(false);

    const register = async () => {
        setIsLoading(true);

        try {
            const payload: RegisterRequest = { email, password, role };
            await AuthService.getInstance().register(payload);
        } catch (error) {
            console.log(error.response);
            // TODO: error
        }

        setIsLoading(false);
    };

    return (
        <div>
            <input type="email" onChange={e => setEmail(e.target.value)} />
            <input
                type="password"
                onChange={e => setPassword(e.target.value)}
            />

            <div className="flex">
                <input
                    checked={role === "CUSTOMER"}
                    type="radio"
                    name="role"
                    id="customer"
                    onChange={e => e.target.checked && setRole(Role.CUSTOMER)}
                />
                CUSTOMER
                <input
                    checked={role === "COACH"}
                    type="radio"
                    name="role"
                    id="COACH"
                    onChange={e => e.target.checked && setRole(Role.COACH)}
                />
                COACH
            </div>

            <button disabled={isLoading} onClick={() => register()}>
                Register
            </button>
        </div>
    );
};

export default Register;
