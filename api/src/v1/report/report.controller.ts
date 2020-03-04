import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "../guard/role.decorator";
import { RolesGuard } from "../guard/roles.guard";
import { RequestUser } from "../user/user.decorator";
import { Role, User } from "../user/user.entity";
import { Report } from "./report.entity";
import { ReportService } from "./report.service";

@Controller("reports")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Get()
    public async index() {
        return await this.reportService.findAll();
    }

    @Get("user/:userId")
    @RoleGuard(Role.COACH)
    public async reports(@Param("userId") userId: number): Promise<Report[]> {
        return await this.reportService.findAllForUser(userId);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(HttpStatus.CREATED)
    public async create(
        @RequestUser() user: User,
        @Body(new ValidationPipe({ transform: true })) report: Report,
    ): Promise<Report> {
        report.user = user;
        await this.reportService.save(report);
        return report;
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    public async delete(@Param("id") id: number) {
        await this.reportService.delete(id);
        return;
    }
}
