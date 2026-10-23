
import { IsIn } from 'class-validator';

export class UpdateRepairStatusDto {
  @IsIn([
    'PENDING',
    'CONFIRMED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
  ])
  status!:
    | 'PENDING'
    | 'CONFIRMED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'CANCELLED';
}
