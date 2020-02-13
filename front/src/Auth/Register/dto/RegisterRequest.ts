import { Role } from "../../../shared/models/User";

export default interface RegisterRequest {
    email: string;
    password: string;
    role: Role;
}
