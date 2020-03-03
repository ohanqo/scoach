export enum Role {
    CUSTOMER = "CUSTOMER",
    COACH = "COACH",
}

export default class User {
    id = 0;
    name = "";
    email = "";
    role: Role = Role.CUSTOMER;
    picture = "";
}
