import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { IsCoachConstraint } from "../validator/is-coach.validator";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        MulterModule.register({
            dest: `${__dirname}/../../../uploads/`,
            storage: multer.diskStorage({
                destination(req, file, cb) {
                    cb(null, `${__dirname}/../../../uploads/`);
                },
                filename(req, file, cb) {
                    const extension = file.originalname.split(".").pop();
                    cb(null, `${uuidv4()}.${extension}`);
                },
            }),
        }),
    ],
    controllers: [UserController],
    providers: [UserService, IsCoachConstraint],
    exports: [UserService],
})
export class UserModule {}
