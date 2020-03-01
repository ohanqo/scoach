import { IsNumber, IsString, MinLength } from "class-validator";
import { IsCustomer } from "src/v1/validator/is-customer.validator";

export default class CreateCourseRequest {
    @IsNumber()
    @IsCustomer()
    customerId: number;

    @IsString()
    @MinLength(2)
    title: string;

    @IsString()
    @MinLength(5)
    content: string;
}
