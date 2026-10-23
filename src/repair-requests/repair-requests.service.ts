import {
  Injectable,
  ServiceUnavailableException,
  NotFoundException,
} from '@nestjs/common';

import { DatabaseService } from '../database/database.service.js';
import { CreateRepairRequestDto } from './dto/create-repair-request.dto.js';
import { UpdateRepairStatusDto } from './dto/update-repair-status.dto.js';
@Injectable()
export class RepairRequestsService {
  constructor(
    private readonly database: DatabaseService,
  ) {}

  async create(dto: CreateRepairRequestDto) {
    try {
      const result = await this.database.query(
        `INSERT INTO tv_repair_requests
          (name, phone, tv_brand, area, service_type, issue_description)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, name, phone, tv_brand, area,
                   service_type, issue_description, status, created_at`,
        [
          dto.name,
          dto.phone,
          dto.tv_brand,
          dto.area,
          dto.service_type,
          dto.issue_description,
        ],
      );

      return {
        message: 'Repair request created successfully',
        data: result.rows[0],
      };
    } catch (error) {
      console.error('Failed to create repair request:', error);

      throw new ServiceUnavailableException(
        'Unable to save repair request. Please try again later.',
      );
    }
  }

  async findAll() {
    const result = await this.database.query(
      `SELECT
         id,
         name,
         phone,
         tv_brand,
         area,
         service_type,
         issue_description,
         status,
         created_at
       FROM tv_repair_requests
       ORDER BY created_at DESC`,
    );

    return {
      message: 'Repair requests fetched successfully',
      count: result.rows.length,
      data: result.rows,
    };

    
  }
  
async updateStatus(
  id: number,
  status: UpdateRepairStatusDto['status'],
) {
  const result = await this.database.query(
    `UPDATE tv_repair_requests
     SET status = $1
     WHERE id = $2
     RETURNING id, name, tv_brand, area, status, created_at`,
    [status, id],
  );

  if (result.rows.length === 0) {
    throw new NotFoundException('Repair request not found');
  }

  return {
    message: 'Repair request status updated successfully',
    data: result.rows[0],
  };
}

}
