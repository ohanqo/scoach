import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public async save(user: User): Promise<User> {
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            throw new HttpException(
                "Mail is already registered",
                HttpStatus.CONFLICT,
            );
        }
    }

    public findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    public findOneByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ email });
    }

    public findOneById(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }
}
