import LoginRequest from "../dtos/LoginRequest";
import LoginResponse from "../dtos/LoginResponse";
import { AUTH_HTTP } from "./HttpService";

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
}
