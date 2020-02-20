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
    Request,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
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
    public async create(
        @Request() request: any,
        @Body(new ValidationPipe({ transform: true })) report: Report,
    ): Promise<Report> {
        report.user = request.user;
        report.date = Date.now();
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
