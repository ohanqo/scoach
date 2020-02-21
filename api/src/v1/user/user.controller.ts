import { MailerService } from "@nest-modules/mailer";
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Request,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import CoachingRequest from "./dto/coaching.request";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("users/")
@UseGuards(AuthGuard("jwt"))
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly mailerService: MailerService,
    ) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    public index(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post("request-coaching")
    public async requestCoaching(
        @Request() request: any,
        @Body(new ValidationPipe()) { message, coachId }: CoachingRequest,
    ) {
        // Write Guard to prevent coach to assign themselves coach
        const customer = request.user as User;
        const coach = await this.userService.findOneById(coachId);

        // if (!coach.isCoach()) {
        //     throw new HttpException()
        // }

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
            throw new HttpException(
                "Mail service unavailable",
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }
}
