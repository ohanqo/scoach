import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Assignment } from "../assignment/assignment.entity";

@Entity({ name: "courses" })
export default class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => Assignment,
        assignment => assignment.id,
    )
    assignment: Assignment;

    @Column()
    title: string;

    @Column()
    content: string;
}
