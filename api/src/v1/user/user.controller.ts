import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RequestUser } from "./user.decorator";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("users")
@UseGuards(AuthGuard("jwt"))
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: "Returns the list of users." })
    public index(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get("coachs")
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: "Returns the list of coachs." })
    public indexCoach(): Promise<User[]> {
        return this.userService.findAllCoach();
    }

    @Get(":id")
    @ApiOperation({ summary: "Returns a specific user." })
    public async show(@Param("id") id: number): Promise<User | undefined> {
        return this.userService.findOneById(id);
    }

    @Put()
    @UseInterceptors(ClassSerializerInterceptor, FileInterceptor("picture"))
    @ApiOperation({ summary: "Update a specific user." })
    public async put(
        @RequestUser() user: User,
        @Body("name") name: string,
        @UploadedFile() picture: any,
    ): Promise<User> {
        user.name = name;

        if (picture) {
            user.picture = picture.filename;
        }

        await this.userService.save(user);

        return user;
    }
}
