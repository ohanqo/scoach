import LoginRequest from "../dtos/LoginRequest";
import LoginResponse from "../dtos/LoginResponse";
import RegisterRequest from "../dtos/RegisterRequest";
import User from "../models/User";
import { HTTP } from "./HttpService";

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
        const response = await HTTP.post<LoginResponse>("login", payload);

        return response.data;
    }

    public async register(user: RegisterRequest) {
        const response = await HTTP.post<User>("register", user);

        return response.data;
    }
}
