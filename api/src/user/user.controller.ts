import { Body, Controller, Get, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    public index(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post()
    public create(@Body() user: User): Promise<User> {
        return this.userService.save(user);
    }
}
