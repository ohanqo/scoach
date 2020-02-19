import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { Report } from "./report.entity";

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>,
    ) {}

    public async save(report: Report): Promise<Report> {
        try {
            return await this.reportRepository.save(report);
        } catch (error) {
            throw error;
        }
    }
}
