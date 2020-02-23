import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Assignment } from "./assignment.entity";

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

    public async findOne(id: number): Promise<Assignment | undefined> {
        return await this.assignmentRepository.findOne(id);
    }

    public async update(id: number, newProperties: Partial<Assignment>) {
        const assignment = await this.findOne(id);

        if (assignment) {
            Object.assign(assignment, newProperties);
            await this.assignmentRepository.save(assignment);
        } else {
            throw new HttpException(
                "The assignment identifier provided does not exsits.",
                HttpStatus.NOT_FOUND,
            );
        }
    }

    public async save(assignment: Partial<Assignment>) {
        return await this.assignmentRepository.save(assignment);
    }

    public async delete(id: number) {
        return await this.assignmentRepository.delete(id);
    }
}
