import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Report } from "./report.entity";

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>,
    ) {}

    public async findAll(): Promise<Report[]> {
        return await this.reportRepository.find();
    }

    public async save(report: Report): Promise<Report> {
        return await this.reportRepository.save(report);
    }

    public async delete(id: number) {
        return await this.reportRepository.delete(id);
    }
}
