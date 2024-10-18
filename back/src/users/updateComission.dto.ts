import { IsNumber, Min, Max } from 'class-validator';

export class UpdateCommissionDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  commision_percentage: number;
}
