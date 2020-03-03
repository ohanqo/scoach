import { Exclude } from "class-transformer";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { Report } from "src/v1/report/report.entity";
import {
    Column,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Assignment } from "../assignment/assignment.entity";
import Course from "../course/course.entity";

export enum Role {
    CUSTOMER = "CUSTOMER",
    COACH = "COACH",
}

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    @Index({ unique: true })
    email: string;

    @Column()
    @IsString()
    name: string;

    @Column()
    @MinLength(6)
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.CUSTOMER,
    })
    @IsEnum(Role)
    role: Role;

    @Column()
    picture: string

    @OneToMany(
        type => Report,
        report => report.user,
        { cascade: true },
    )
    reports: Report[];

    @ManyToMany(type => User)
    @JoinTable({
        name: "coach_customers",
        joinColumn: { name: "coach" },
        inverseJoinColumn: { name: "customer" },
    })
    customers: User[];

    @OneToMany(
        type => Assignment,
        assignment => assignment.coach,
    )
    coachAssignments: Assignment[];

    @OneToMany(
        type => Assignment,
        assignment => assignment.customer,
    )
    customerAssignments: Assignment[];

    public isCoach(): boolean {
        return this.role === Role.COACH;
    }

    public isCustomer(): boolean {
        return !this.isCoach();
    }
}
