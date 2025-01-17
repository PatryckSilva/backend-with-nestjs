import { Inject } from '@nestjs/common';
import { IMachinesRepository, TPrismaMachineInput } from '../interfaces';

export class MachinesService {
  @Inject('IMachinesRepository')
  private readonly machinesRepository: IMachinesRepository;

  async executeFindAll() {
    const response = await this.machinesRepository.findAll();
    return {
      machines: response,
    };
  }

  async executeCreateMachine(machineBody: TPrismaMachineInput) {
    const response = await this.machinesRepository.create(machineBody);
    return {
      response,
    };
  }
}
