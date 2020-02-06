import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    HttpException,
    HttpStatus,
    Post,
    UseInterceptors,
    ValidationPipe,
} from "@nestjs/common";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import LoginRequestDTO from "./dto/login.request";
import LoginResponseDTO from "./dto/login.response";

@Controller()
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    @Post("/login")
    @UseInterceptors(ClassSerializerInterceptor)
    async login(
        @Body(new ValidationPipe({ transform: true }))
        { email, password }: LoginRequestDTO,
    ): Promise<LoginResponseDTO> {
        const user = await this.userService.findOneByEmail(email);

        if (this.areCredentialsCorrect(password, user)) {
            return await this.sendLoginResponse(user);
        } else {
            throw new HttpException("Not Authorized", HttpStatus.UNAUTHORIZED);
        }
    }

    @Post("/register")
    @UseInterceptors(ClassSerializerInterceptor)
    async register(@Body(new ValidationPipe({ transform: true })) user: User) {
        const hashedPassword = await this.authService.hashPassword(
            user.password,
        );
        user.password = hashedPassword;
        await this.userService.save(user);
        return user;
    }

    private areCredentialsCorrect(
        requestPassword: string,
        user?: User,
    ): boolean {
        return (
            user &&
            this.authService.comparePassword(requestPassword, user.password)
        );
    }

    private async sendLoginResponse(user: User): Promise<LoginResponseDTO> {
        const access_token = await this.authService.generateToken(user);
        const response = Object.assign(new LoginResponseDTO(), {
            access_token,
            user,
        });

        return response;
    }
}
