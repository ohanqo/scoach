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

    public async findAllForUser(
        user: User,
        potentialLimit?: number,
    ): Promise<Course[]> {
        const assignmentRelation = user.isCoach()
            ? "assignment.coachId"
            : "assignment.customerId";

        const request = this.courseRepository
            .createQueryBuilder("course")
            .leftJoinAndSelect("course.assignment", "assignment")
            .where(`${assignmentRelation} = :userId`, { userId: user.id })
            .leftJoinAndSelect("assignment.coach", "coach")
            .leftJoinAndSelect("assignment.customer", "customer");

        if (potentialLimit) {
            request.limit(potentialLimit);
        }

        return await request.getMany();
    }

    public async save(course: Course): Promise<Course> {
        return await this.courseRepository.save(course);
    }
}
