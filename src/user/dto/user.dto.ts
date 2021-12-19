import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({example: 'email21@gmail.com', description: 'Email address'})
    readonly email: string;

    @ApiProperty({example: 'qweg324tf', description: 'Password'})
    readonly password: string;
}