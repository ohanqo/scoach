import { Assignment } from "./Assignment";

export default class Course {
    public id: number = 0;
    public assignment: Assignment = new Assignment();
    public title = "";
    public content = "";
}
