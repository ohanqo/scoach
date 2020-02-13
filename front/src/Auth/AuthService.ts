import LoginRequest from "./Login/dto/LoginRequest";
import LoginResponse from "./Login/dto/LoginResponse";
import RegisterRequest from "./Register/dto/RegisterRequest";
import User from "../shared/models/User";
import { HTTP } from "../shared/http";

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
