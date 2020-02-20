import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/v1/user/user.entity";
import { UserModule } from "src/v1/user/user.module";
import { ReportController } from "./report.controller";
import { Report } from "./report.entity";
import { ReportService } from "./report.service";

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([Report, User])],
    controllers: [ReportController],
    providers: [ReportService],
})
export class ReportModule {}
