import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Assignment, AssignmentStatus } from "../assignment/assignment.entity";
import { AssignmentService } from "../assignment/assignment.service";
import { RoleGuard } from "../guard/role.decorator";
import { RolesGuard } from "../guard/roles.guard";
import { RequestUser } from "../user/user.decorator";
import { Role, User } from "../user/user.entity";
import Course from "./course.entity";
import { CourseService } from "./course.service";
import CreateCourseRequest from "./dto/create-course.request";

@ApiTags("Course")
@Controller("courses")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class CourseController {
    constructor(
        private readonly courseService: CourseService,
        private readonly assignmentService: AssignmentService,
    ) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({
        summary: "Return course list for connected user.",
    })
    public async index(@RequestUser() user: User) {
        return await this.courseService.findAllForUser(user);
    }

    @Get("/limits/:limit")
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({
        summary: "Return course list with limit for connected user.",
    })
    public async indexPaginated(
        @RequestUser() user: User,
        @Param("limit") limit: number,
    ) {
        return await this.courseService.findAllForUser(user, limit);
    }

    @Post()
    @RoleGuard(Role.COACH)
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: "Create a course.",
    })
    public async create(
        @RequestUser() coach: User,
        @Body() { customerId, title, content }: CreateCourseRequest,
    ) {
        const assignment = await this.findAssignment(coach.id, customerId);

        const course: Course = {
            id: 0,
            assignment,
            title,
            content,
        };

        return await this.courseService.save(course);
    }

    @Delete(":id")
    @RoleGuard(Role.COACH)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: "Delete a specified course.",
    })
    public async delete(@Param("id") id: number) {
        return await this.courseService.delete(id);
    }

    private async findAssignment(
        coachId: number,
        customerId: number,
    ): Promise<Assignment> {
        const assignment = await this.assignmentService.findOneForCoachAndCustomer(
            coachId,
            customerId,
        );

        if (!assignment) {
            throw new HttpException(
                "There is not assignment with this customer.",
                HttpStatus.NOT_FOUND,
            );
        }

        if (assignment.status !== AssignmentStatus.CONFIRMED) {
            throw new HttpException(
                "You have not accepted the assignment request.",
                HttpStatus.NOT_ACCEPTABLE,
            );
        }

        return assignment;
    }
}
