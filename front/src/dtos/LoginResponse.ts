import User from "../models/User";

export default interface LoginResponse {
    access_token: string;
    user: User;
}
