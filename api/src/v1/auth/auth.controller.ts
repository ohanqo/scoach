import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "src/v1/user/user.entity";
import { UserService } from "src/v1/user/user.service";
import { RequestUser } from "../user/user.decorator";
import { AuthService } from "./auth.service";
import LoginRequestDTO from "./dto/login.request";
import LoginResponseDTO from "./dto/login.response";

@ApiTags("Auth")
@Controller()
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    @Post("/login")
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({
        summary:
            "Log user with his email and password. Returns the user with his jwt token.",
    })
    async login(
        @Body(new ValidationPipe({ transform: true }))
        { email, password }: LoginRequestDTO,
    ): Promise<LoginResponseDTO> {
        const user = await this.userService.findOneByEmail(email);

        if (this.areCredentialsCorrect(password, user)) {
            return await this.sendLoginResponse(user!);
        } else {
            throw new HttpException(
                "Wrong credentials",
                HttpStatus.UNAUTHORIZED,
            );
        }
    }

    @Post("/register")
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({
        summary: "Register a user with email and password.",
    })
    async register(@Body(new ValidationPipe({ transform: true })) user: User) {
        const hashedPassword = await this.authService.hashPassword(
            user.password,
        );
        user.password = hashedPassword;
        await this.userService.save(user);
        return user;
    }

    @Get("/me")
    @UseGuards(AuthGuard("jwt"))
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({
        summary:
            "Return the current user currently connected via his jwt token.",
    })
    async me(@RequestUser() user: User) {
        return user;
    }

    private areCredentialsCorrect(
        requestPassword: string,
        user?: User,
    ): boolean {
        const arePasswordMatching =
            user &&
            this.authService.comparePassword(requestPassword, user.password);

        return arePasswordMatching ?? false;
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
