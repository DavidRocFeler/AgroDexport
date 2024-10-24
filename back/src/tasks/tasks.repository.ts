import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './task.dto'; 
import { Task } from '@prisma/client';

@Injectable()
export class TasksRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const taskData = {
            task_name: createTaskDto.task_name,
            task_status: createTaskDto.task_status,
            task_message: createTaskDto.task_message,
            nextRun_date: createTaskDto.nextRun_date,
        };

        return await this.prisma.task.create({
            data: taskData,
        });
    }
}
