import { MailerService } from "@nest-modules/mailer";
import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../guard/roles.guard";
import { RoleGuard } from "../user/role.decorator";
import { RequestUser } from "../user/user.decorator";
import { Role, User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import CoachingRequest from "./dto/coaching.request";

@Controller("assignments")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class AssignmentController {
    public constructor(
        private userService: UserService,
        private mailerService: MailerService,
    ) {}

    @Post()
    @RoleGuard(Role.CUSTOMER)
    public async create(
        @RequestUser() customer: User,
        @Body() { message, coachId }: CoachingRequest,
    ) {
        const coach = await this.userService.findOneById(coachId);

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
            return `${coach.name} has been notified!`;
        } catch (error) {
            console.error(error);

            throw new HttpException(
                "Mail service unavailable",
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }
}
