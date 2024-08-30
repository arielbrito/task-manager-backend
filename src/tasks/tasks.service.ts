import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { title, content, userId } = createTaskDto;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    const task = await this.prisma.tasks.create({
      data: {
        title,
        content,
        status: 'TODO',
        User: { connect: { id: userId } },
      },
    });

    return task;
  }

  async findAll() {
    return this.prisma.tasks.findMany();
  }

  async findUserTasks(userId: number) {
    return this.prisma.tasks.findMany({
      where: { userId },
    });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prisma.tasks.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      throw new NotFoundException('La tarea no se encontró o no pertenece al usuario');
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const task = await this.prisma.tasks.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      throw new NotFoundException('La tarea no se encontró o no pertenece al usuario');
    }

    return this.prisma.tasks.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number, userId: number) {
    const task = await this.prisma.tasks.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      throw new NotFoundException('La tarea no se encontró o no pertenece al usuario');
    }

    return this.prisma.tasks.delete({
      where: { id },
    });
  }
}
