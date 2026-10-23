import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { RepairRequestsController } from './repair-requests.controller.js';
import { RepairRequestsService } from './repair-requests.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [RepairRequestsController],
  providers: [RepairRequestsService],
})
export class RepairRequestsModule {}