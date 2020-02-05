import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    public findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
}
