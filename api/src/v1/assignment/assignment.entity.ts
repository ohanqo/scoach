import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

export enum AssignmentStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    DECLINED = "DECLINED",
}

@Entity({ name: "assignments" })
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => User,
        user => user.id,
    )
    coach: User;

    @ManyToOne(
        type => User,
        user => user.id,
    )
    customer: User;

    @Column({
        type: "enum",
        enum: AssignmentStatus,
        default: AssignmentStatus.PENDING,
    })
    status: AssignmentStatus;

    @Column({ type: "bigint", default: () => Math.floor(Date.now() / 1000) })
    date: number;
}
