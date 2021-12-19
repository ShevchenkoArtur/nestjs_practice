import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDto} from "./dto/user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserModel} from "./model/user.model";

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({summary: 'Create new user'})
    @ApiResponse({status: 200, type: UserModel})
    @Post()
    createUser(@Body() userDto: UserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({summary: 'Find all users'})
    @ApiResponse({type: [UserModel]})
    @Get()
    findAllUsers() {
        return this.userService.findAllUsers();
    }
}
