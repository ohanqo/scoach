import { Exclude } from "class-transformer";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

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
}
