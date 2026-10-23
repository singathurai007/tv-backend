import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService
  implements OnModuleInit, OnModuleDestroy
{
  private readonly pool: Pool;

  constructor(private readonly config: ConfigService) {
    this.pool = new Pool({
      host: this.config.getOrThrow<string>('PGHOST'),
      port: this.config.getOrThrow<number>('PGPORT'),
      database: this.config.getOrThrow<string>('PGDATABASE'),
      user: this.config.getOrThrow<string>('PGUSER'),
      password: this.config.getOrThrow<string>('PGPASSWORD'),
      max: 10,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      application_name: 'tv-repair-backend',
    });

    this.pool.on('error', () => {
      // Credentials அல்லது database details-ஐ log செய்ய வேண்டாம்.
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      const result = await this.pool.query(
        'SELECT current_database() AS database_name',
      );

      console.log(
        `PostgreSQL connected: ${result.rows[0].database_name}`,
      );
    } catch {
      throw new ServiceUnavailableException(
        'Unable to connect to PostgreSQL. Check database settings.',
      );
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }

  async query<T extends Record<string, unknown>>(
    sql: string,
    values: unknown[] = [],
  ) {
    return this.pool.query<T>(sql, values);
  }
}