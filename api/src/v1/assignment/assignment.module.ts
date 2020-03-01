import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GuardModule } from "../guard/guard.module";
import { User } from "../user/user.entity";
import { UserModule } from "../user/user.module";
import { IsCustomerConstraint } from "../validator/is-customer.validator";
import { AssignmentController } from "./assignment.controller";
import { Assignment } from "./assignment.entity";
import { AssignmentService } from "./assignment.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Assignment, User]),
        UserModule,
        GuardModule,
    ],
    providers: [AssignmentService, IsCustomerConstraint],
    controllers: [AssignmentController],
    exports: [AssignmentService]
})
export class AssignmentModule {}
