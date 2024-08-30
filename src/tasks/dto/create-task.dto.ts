import { IsNotEmpty, IsString, IsEnum, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
    TODO='TODO',
    DOING='DOING',
    DONE='DONE'
}

export class CreateTaskDto {
    @ApiProperty({ example: 'Task title', description: 'The title of the task' })
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @ApiProperty({ example: 'Task content', description: 'The content of the task' })
    @IsString()
    @IsNotEmpty()
    content: string;
     
    @ApiProperty({ example: 'TODO', description: 'The status of the task' })
    @IsEnum(TaskStatus)
    status: TaskStatus;
    
    @ApiProperty({ example: 1, description: 'The user id of the task' })
    @IsInt()
    @IsNotEmpty()
    userId: number;
}
