import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './task.dto';
import { Task } from '@prisma/client';
export declare class TasksRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
}
