import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { IsCoachConstraint } from "./is-coach.validator";
import { IsCustomerConstraint } from "./is-customer.validator";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [IsCoachConstraint, IsCustomerConstraint],
})
export class ValidatorModule {}
