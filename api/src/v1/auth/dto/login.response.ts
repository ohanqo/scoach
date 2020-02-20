import { User } from "src/v1/user/user.entity";

export default class LoginResponseDTO {
    access_token = "";
    user = new User();
}
