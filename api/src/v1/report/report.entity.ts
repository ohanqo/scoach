import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { User } from "src/v1/user/user.entity";
import {
    Column,
    Double,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "reports" })
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "double" })
    @IsNumber()
    weight: Double;

    @Column({ type: "text" })
    @IsString()
    comment: string;

    @Column({ type: "bigint", default: () => Math.floor(Date.now() / 1000) })
    date: number;

    @ManyToOne(
        type => User,
        user => user.reports,
    )
    @Transform(user => user.id)
    user: User;
}
