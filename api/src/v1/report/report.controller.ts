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
import { RequestUser } from "../user/user.decorator";
import { User } from "../user/user.entity";
import { Report } from "./report.entity";
import { ReportService } from "./report.service";

@Controller("reports/")
@UseGuards(AuthGuard("jwt"))
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Get()
    public async index() {
        return await this.reportService.findAll();
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
