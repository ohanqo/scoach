import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseController } from "./course.controller";
import Course from "./course.entity";
import { CourseService } from "./course.service";
import { AssignmentModule } from "../assignment/assignment.module";

@Module({
    imports: [TypeOrmModule.forFeature([Course]), AssignmentModule],
    controllers: [CourseController],
    providers: [CourseService],
})
export class CourseModule {}
