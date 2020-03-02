import User from "../shared/models/User";

export enum AssignmentStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    DECLINED = "DECLINED",
}

export class Assignment {
    public id: number = 0;
    public coach: User = new User();
    public customer: User = new User();
    public status: AssignmentStatus = AssignmentStatus.PENDING;
    public date: number = 0;
}
