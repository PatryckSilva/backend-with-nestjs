import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MachinesService } from './services/machine.service';
import { TCreateMachine, TUpdateMachine } from './interfaces';

@Controller('machines')
export class MachinesController {
  @Inject(MachinesService)
  private readonly machineService: MachinesService;

  @Get()
  async findAll() {
    return this.machineService.executeFindAll();
  }

  @Post('create')
  async create(@Body() machineInput: TCreateMachine) {
    return this.machineService.executeCreate(machineInput);
  }

  @Patch('update/:id')
  async update(@Param('id') machineId: string, @Body() status: TUpdateMachine) {
    return this.machineService.executeUpdateStatus(machineId, status);
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    return this.machineService.executeFindByName(name);
  }
}
