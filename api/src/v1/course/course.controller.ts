import { Controller, Get, UseGuards, ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RequestUser } from "../user/user.decorator";
import { User } from "../user/user.entity";
import { CourseService } from "./course.service";

@Controller("courses")
@UseGuards(AuthGuard("jwt"))
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    public async index(@RequestUser() user: User) {
        return await this.courseService.findAllForUser(user);
    }
}
