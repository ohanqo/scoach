import { MailerService } from "@nest-modules/mailer";
import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "../guard/role.decorator";
import { RolesGuard } from "../guard/roles.guard";
import { RequestUser } from "../user/user.decorator";
import { Role, User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { Assignment } from "./assignment.entity";
import { AssignmentService } from "./assignment.service";
import AnswerCoachingRequest from "./dto/answer-coaching.request";
import CoachingRequest from "./dto/coaching.request";

@Controller("assignments/")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class AssignmentController {
    public constructor(
        private userService: UserService,
        private mailerService: MailerService,
        private assignmentService: AssignmentService,
    ) {}

    @Get()
    public async index(@RequestUser() user: User): Promise<Assignment[]> {
        return await this.assignmentService.findAllForUser(user);
    }

    @Get("confirmed")
    public async getCoachList(
        @RequestUser() user: User,
    ): Promise<Assignment[]> {
        let response: Assignment[] = [];

        if (user.isCustomer()) {
            response = await this.assignmentService.findAllCoach(user.id);
        } else {
            response = await this.assignmentService.findAllCustomer(user.id);
        }

        return response;
    }

    @Post()
    @RoleGuard(Role.CUSTOMER)
    public async create(
        @RequestUser() customer: User,
        @Body() { message, coachId }: CoachingRequest,
    ) {
        const coach = await this.userService.findOneById(coachId);
        await this.sendCoachingRequestMail(customer, coach!, message);
        await this.saveCoachingRequest(customer, coach!);
        return `${coach!.name} has been notified!`;
    }

    @Patch(":assignmentId")
    @RoleGuard(Role.COACH)
    public async update(
        @Param("assignmentId") assignmentId: number,
        @Body() { answer }: AnswerCoachingRequest,
    ) {
        const newProperties: Partial<Assignment> = {
            status: answer,
        };

        await this.assignmentService.update(assignmentId, newProperties);
    }

    private async sendCoachingRequestMail(
        customer: User,
        coach: User,
        message: string,
    ) {
        try {
            await this.mailerService.sendMail({
                to: coach.email,
                subject: "Scoach — New request for coaching",
                template: "request_for_coaching",
                context: {
                    coachName: coach.name,
                    customerName: customer.name,
                    customerMessage: message,
                },
            });
        } catch (error) {
            console.error(error);

            throw new HttpException(
                "Mail service unavailable",
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }

    private async saveCoachingRequest(customer: User, coach: User) {
        const assignment: Partial<Assignment> = {
            coach,
            customer,
        };

        await this.assignmentService.save(assignment);
    }
}
