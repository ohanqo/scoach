import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AssignmentController } from "./assignment.controller";
import { AssignmentService } from "./assignment.service";
import { GuardModule } from "../guard/guard.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assignment } from "./assignment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Assignment]), UserModule, GuardModule],
    providers: [AssignmentService],
    controllers: [AssignmentController],
})
export class AssignmentModule {}
