import { Test, TestingModule } from '@nestjs/testing';
import { RepairRequestsController } from './repair-requests.controller.js';

describe('RepairRequestsController', () => {
  let controller: RepairRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepairRequestsController],
    }).compile();

    controller = module.get<RepairRequestsController>(RepairRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
