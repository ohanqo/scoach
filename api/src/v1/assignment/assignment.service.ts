import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Assignment } from "./assignment.entity";
import AssignmentDTO from "./dto/assignment";

@Injectable()
export class AssignmentService {
    public constructor(
        @InjectRepository(Assignment)
        private readonly assignmentRepository: Repository<Assignment>,
    ) {}

    public async findAllForUser(user: User): Promise<Assignment[]> {
        const relationTypeToLookFor = user.isCoach() ? "customerId" : "coachId";
        return await this.assignmentRepository.find({
            relations: ["customer", "coach"],
            [relationTypeToLookFor]: user.id,
        });
    }

    public async save(assignment: AssignmentDTO) {
        return await this.assignmentRepository.save(assignment);
    }

    public async delete(id: number) {
        return await this.assignmentRepository.delete(id);
    }
}
