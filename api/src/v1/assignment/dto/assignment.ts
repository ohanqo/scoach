import { User } from "src/v1/user/user.entity";

export default class AssignmentDTO {
    coach: User;
    customer: User;
}
