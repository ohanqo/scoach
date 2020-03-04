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
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "../guard/role.decorator";
import { RolesGuard } from "../guard/roles.guard";
import { RequestUser } from "../user/user.decorator";
import { Role, User } from "../user/user.entity";
import { Report } from "./report.entity";
import { ReportService } from "./report.service";

@ApiTags("Report")
@Controller("reports")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Get()
    @ApiOperation({
        summary: "Return report list for connected user.",
    })
    public async index(@RequestUser() { id }: User) {
        return await this.reportService.findAllForUser(id);
    }

    @Get("user/:userId")
    @RoleGuard(Role.COACH)
    @ApiOperation({
        summary: "[COACH] Return report list for specified user.",
    })
    public async reports(@Param("userId") userId: number): Promise<Report[]> {
        return await this.reportService.findAllForUser(userId);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: "Create a report.",
    })
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
    @ApiOperation({
        summary: "Delete a specified report.",
    })
    public async delete(@Param("id") id: number) {
        await this.reportService.delete(id);
        return;
    }
}
