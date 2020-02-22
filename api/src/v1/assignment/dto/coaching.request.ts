import { IsNumber, IsString } from "class-validator";
import { IsCoach } from "../../validator/is-coach.validator";

export default class CoachingRequest {
    @IsNumber()
    @IsCoach()
    coachId: number;

    @IsString()
    message: string;
}
