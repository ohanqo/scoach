import { Role } from "../../../shared/models/User";

export default interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role: Role;
}
