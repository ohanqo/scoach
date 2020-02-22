import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsCoachConstraint implements ValidatorConstraintInterface {
    public constructor(
        @InjectRepository(User) private repository: Repository<User>,
    ) {}

    async validate(coachId: number, _: ValidationArguments) {
        const user = await this.repository.findOne(coachId);
        return user?.isCoach() ?? false;
    }
}

export function IsCoach(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        const defaultOptions: ValidationOptions = {
            message: "The user needs to be a coach",
        };

        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions ?? defaultOptions,
            constraints: [],
            validator: IsCoachConstraint,
        });
    };
}
