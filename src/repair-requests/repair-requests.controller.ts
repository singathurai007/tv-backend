import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateRepairRequestDto } from './dto/create-repair-request.dto.js';
import { UpdateRepairStatusDto } from './dto/update-repair-status.dto.js';
import { RepairRequestsService } from './repair-requests.service.js';
@Controller('repair-requests')
export class RepairRequestsController {
  constructor(
    private readonly repairRequestsService: RepairRequestsService,
  ) {}

  @Post()
  async create(@Body() dto: CreateRepairRequestDto) {
    return this.repairRequestsService.create(dto);
  }

  @Get()
  async findAll() {
    return this.repairRequestsService.findAll();
 
}


@Patch(':id/status')
async updateStatus(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdateRepairStatusDto,
) {
  return this.repairRequestsService.updateStatus(
    id,
    dto.status,
  );
}

}

