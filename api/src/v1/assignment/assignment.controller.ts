import { MailerService } from "@nest-modules/mailer";
import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
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
import AssignmentDTO from "./dto/assignment";
import CoachingRequest from "./dto/coaching.request";

@Controller("assignments")
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

    @Post()
    @RoleGuard(Role.CUSTOMER)
    public async create(
        @RequestUser() customer: User,
        @Body() { message, coachId }: CoachingRequest,
    ) {
        const coach = await this.userService.findOneById(coachId);
        await this.sendCoachingRequestMail(customer, coach, message);
        await this.saveCoachingRequest(customer, coach);
        return `${coach.name} has been notified!`;
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
        const assignment: AssignmentDTO = {
            coach,
            customer,
        };

        await this.assignmentService.save(assignment);
    }
}
