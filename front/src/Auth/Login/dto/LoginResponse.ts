import User from "../../../shared/models/User";

export default interface LoginResponse {
    access_token: string;
    user: User;
}
