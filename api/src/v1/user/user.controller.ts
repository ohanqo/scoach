import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("users/")
@UseGuards(AuthGuard("jwt"))
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    public index(): Promise<User[]> {
        return this.userService.findAll();
    }
}
