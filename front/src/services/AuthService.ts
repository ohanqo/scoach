import LoginRequest from "../dtos/LoginRequest";
import LoginResponse from "../dtos/LoginResponse";
import User from "../models/User";
import { AUTH_HTTP } from "./HttpService";
import RegisterRequest from "../dtos/RegisterRequest";

export default class AuthService {
    private static instance: AuthService;
    public static getInstance() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }

        return AuthService.instance;
    }

    public async login(
        email: string,
        password: string,
    ): Promise<LoginResponse> {
        const payload: LoginRequest = { email, password };
        const response = await AUTH_HTTP.post<LoginResponse>(
            "login",
            JSON.stringify(payload),
        );

        return response.data;
    }

    public async register(user: RegisterRequest) {
        const response = await AUTH_HTTP.post<User>(
            "register",
            JSON.stringify(user),
        );

        return response.data;
    }
}
