import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";

export enum Role {
    CUSTOMER = "CUSTOMER",
    COACH = "COACH",
}

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({ unique: true })
    email: string;

    @Column()
    password: string

    @Column({
        type: "enum",
        enum: Role,
        default: Role.CUSTOMER,
    })
    role: Role;
}
