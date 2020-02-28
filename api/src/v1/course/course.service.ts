import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import Course from "./course.entity";

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    public async findAllForUser(user: User): Promise<Course[]> {
        const assignmentRelation = user.isCoach()
            ? "assignment.coachId"
            : "assignment.customerId";

        return await this.courseRepository
            .createQueryBuilder("course")
            .leftJoinAndSelect("course.assignment", "assignment")
            .where(`${assignmentRelation} = :userId`, { userId: user.id })
            .leftJoinAndSelect("assignment.coach", "coach")
            .leftJoinAndSelect("assignment.customer", "customer")
            .getMany();
    }
}
