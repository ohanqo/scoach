import { HandlebarsAdapter, MailerModule } from "@nest-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssignmentModule } from "./assignment/assignment.module";
import { AuthModule } from "./auth/auth.module";
import { ReportModule } from "./report/report.module";
import { templatesPath } from "./template/template.utils";
import { UserModule } from "./user/user.module";
import { ValidatorModule } from "./validator/validator.module";
import { GuardModule } from './guard/guard.module';
import { CourseModule } from './course/course.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        MailerModule.forRoot({
            transport: {
                host: "smtp.mailtrap.io",
                port: 2525,
                secure: false,
                tls: {
                    rejectUnauthorized: false,
                },
                auth: {
                    user: "a6149d56d96bba",
                    pass: "49e6ffbb098aed",
                },
            },
            defaults: {
                from: '"Scoach" <no-reply@scoach.io>',
            },
            template: {
                dir: templatesPath,
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        UserModule,
        AuthModule,
        ReportModule,
        ValidatorModule,
        AssignmentModule,
        GuardModule,
        CourseModule,
    ],
})
export class AppModule {}
