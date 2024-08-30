import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma.service'; // Assuming the path is correct, make sure the module is installed
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './dto/task-status.enum';

describe('TasksService', () => {
  let service: TasksService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, PrismaService],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test Task',
      content: 'This is a test task',
      status: TaskStatus.TODO,
      userId: 1,
    };
  
    jest.spyOn(prismaService.tasks, 'create').mockResolvedValue({
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createTaskDto,
    });
  
    const result = await service.create(createTaskDto);
  
    expect(result).toEqual({
      id: 1,
      title: 'Test Task',
      content: 'This is a test task',
      status: TaskStatus.TODO,
      userId: 1,
      createdAt: expect.any(Date),  // Espera cualquier fecha
      updatedAt: expect.any(Date),  // Espera cualquier fecha
    });
  });
  

  it('should return a task by ID', async () => {
    const taskId = 1;
    const userId = 1;
  
    const task = {
        id: 1,
        title: 'Test Task',
        content: 'This is a test task',
        status: TaskStatus.TODO,
        userId: 1,
        createdAt: new Date(),  // Añadir createdAt
        updatedAt: new Date(),  // Añadir updatedAt
      };
  
    jest.spyOn(prismaService.tasks, 'findFirst').mockResolvedValue(task);
  
    const result = await service.findOne(taskId, userId);
  
    expect(result).toEqual(task);
  });


  it('should return tasks of a specific user', async () => {
    const userId = 1;
  
    const tasks = [
      {
        id: 1,
        title: 'Test Task 1',
        content: 'This is a test task 1',
        status: TaskStatus.TODO,
        userId: userId,
        createdAt: new Date(),  // Añadir createdAt
        updatedAt: new Date(),  // Añadir updatedAt
      },
      {
        id: 2,
        title: 'Test Task 2',
        content: 'This is a test task 2',
        status: TaskStatus.DOING,
        userId: userId,
        createdAt: new Date(),  // Añadir createdAt
        updatedAt: new Date(),  // Añadir updatedAt
      },
    ];
  
    jest.spyOn(prismaService.tasks, 'findMany').mockResolvedValue(tasks);
  
    const result = await service.findUserTasks(userId);
  
    expect(result).toEqual(tasks);
  });


  it('should update a task by ID', async () => {
    const taskId = 1;
    const userId = 1;
    const updateTaskDto = {
      title: 'Updated Task Title',
      content: 'Updated content',
      status: TaskStatus.DONE,
      createdAt: new Date(),  // Añadir createdAt
      updatedAt: new Date(),  // Añadir updatedA
    };
  
    const task = {
      id: taskId,
      ...updateTaskDto,
      userId,
    };
  
    jest.spyOn(prismaService.tasks, 'findFirst').mockResolvedValue(task);
    jest.spyOn(prismaService.tasks, 'update').mockResolvedValue(task);
  
    const result = await service.update(taskId, updateTaskDto, userId);
  
    expect(result).toEqual(task);
  });


  it('should delete a task by ID', async () => {
    const taskId = 1;
    const userId = 1;
  
    const task = {
      id: taskId,
      title: 'Test Task',
      content: 'This is a test task',
      status: TaskStatus.TODO,
      userId: userId,
      createdAt: new Date(),  // Añadir createdAt
      updatedAt: new Date(),  // Añadir updatedA
    };
  
    jest.spyOn(prismaService.tasks, 'findFirst').mockResolvedValue(task);
    jest.spyOn(prismaService.tasks, 'delete').mockResolvedValue(task);
  
    const result = await service.remove(taskId, userId);
  
    expect(result).toEqual(task);
  });
  
  
  
  
  

  // Aquí vamos a escribir más pruebas.
});
