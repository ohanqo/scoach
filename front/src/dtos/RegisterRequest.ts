import { Role } from "../models/User";

export default interface RegisterRequest {
    email: string;
    password: string;
    role: Role;
}
