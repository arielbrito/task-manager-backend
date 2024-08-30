import { IsString, IsEmail, IsNotEmpty, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsString() 
    @IsOptional()   
    readonly name: string;
    
    @ApiProperty({ example: 'johnd@exampl.com', description: 'The email of the user' })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    
    @ApiProperty({ example: 'password', description: 'The password of the user' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'La contraseña debe ser minimo de 8 caracteres' })
    @MaxLength(20, { message: 'La contraseña debe ser maximo de 20 caracteres' })
    readonly password: string;

    @ApiProperty({ example: 'admin', description: 'The role of the user' })
    @IsString()
    @IsOptional()
    readonly role: string;
}
