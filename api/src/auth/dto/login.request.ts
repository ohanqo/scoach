import { IsEmail, IsString, MinLength } from "class-validator";

export default class LoginRequestDTO {
    @IsEmail()
    email = "";

    @MinLength(6)
    @IsString()
    password = "";
}
