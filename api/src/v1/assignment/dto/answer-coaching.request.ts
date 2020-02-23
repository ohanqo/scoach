import { IsEnum } from "class-validator";
import { AssignmentStatus } from "../assignment.entity";

export default class AnswerCoachingRequest {
    @IsEnum(AssignmentStatus)
    public answer: AssignmentStatus;
}
