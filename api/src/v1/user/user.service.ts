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

    public async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ email });
    }

    public async findOneById(id: number): Promise<User | undefined> {
        return await this.userRepository.findOne(id);
    }
}
