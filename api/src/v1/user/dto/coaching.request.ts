import { IsNumber, IsString, Validate } from "class-validator";
import { IsCoachConstraint } from "../../validator/is-coach.validator";

export default class CoachingRequest {
    @IsNumber()
    @Validate(IsCoachConstraint)
    coachId: number;

    @IsString()
    message: string;
}
