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
export class IsCustomerConstraint implements ValidatorConstraintInterface {
    public constructor(
        @InjectRepository(User) private repository: Repository<User>,
    ) {}

    async validate(customerId: number, _: ValidationArguments) {
        const user = await this.repository.findOne(customerId);
        return user?.isCustomer() ?? false;
    }
}

export function IsCustomer(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        const defaultOptions: ValidationOptions = {
            message: "The user needs to be a customer",
        };

        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions ?? defaultOptions,
            constraints: [],
            validator: IsCustomerConstraint,
        });
    };
}
