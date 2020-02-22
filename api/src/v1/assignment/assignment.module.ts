import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AssignmentController } from "./assignment.controller";
import { AssignmentService } from "./assignment.service";
import { GuardModule } from "../guard/guard.module";

@Module({
    imports: [UserModule, GuardModule],
    providers: [AssignmentService],
    controllers: [AssignmentController],
})
export class AssignmentModule {}
