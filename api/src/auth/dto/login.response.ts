import { User } from "src/user/user.entity";

export default class LoginResponseDTO {
    access_token = "";
    user = new User();
}
