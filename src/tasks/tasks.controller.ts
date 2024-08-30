import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

interface RequestWithUser extends Request {
  user: {
    userId: number;
    username: string;
    role: string;
  };
}
@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @ApiOperation({ summary: 'Create a task' })
  @ApiResponse({ status: 201, description: 'The task' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Tasks list' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
  @ApiOperation({ summary: 'Get my tasks' })
  @ApiResponse({ status: 200, description: 'Tasks list user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('my-tasks')
  findUserTasks(@Request() req: RequestWithUser) {
    
    return this.tasksService.findUserTasks(req.user.userId);
  }


  @ApiOperation({ summary: 'Get a task by id of one user' })
  @ApiResponse({ status: 200, description: 'The task' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':id')
  findOne(@Param('id') id: string , @Request() req: RequestWithUser) {
    return this.tasksService.findOne(+id, req.user.userId);
  }
  
  @ApiOperation({ summary: 'Update a task' }) 
  @ApiResponse({ status: 200, description: 'The task' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req: RequestWithUser) {
    return this.tasksService.update(+id, updateTaskDto, req.user.userId);
  }

  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'The task' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.tasksService.remove(+id, req.user.userId);
  }
}
