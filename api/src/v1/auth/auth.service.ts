import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "src/v1/user/user.entity";
import { UserService } from "src/v1/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser({ email, password }: User): Promise<User | null> {
        const user = await this.userService.findOneByEmail(email);

        if (user?.password === password) {
            return user;
        }

        return null;
    }

    async generateToken({ id, email }: User): Promise<string> {
        const payload = { id, email };
        return this.jwtService.sign(payload);
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    comparePassword(clearPassword: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(clearPassword, hashedPassword);
    }
}
