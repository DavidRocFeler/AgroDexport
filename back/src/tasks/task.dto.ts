import { IsString, IsOptional, IsDate } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    task_name: string;

    @IsString()
    task_status: string;

    @IsString()
    task_message: string;

    @IsOptional()
    @IsDate()
    executed_date?: Date;

    @IsOptional()
    @IsDate()
    nextRun_date?: Date;
}
