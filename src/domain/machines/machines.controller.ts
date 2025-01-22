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
  async searchAll() {
    return this.machineService.searchAll();
  }

  @Post('create')
  async create(@Body() machineInput: TCreateMachine) {
    return this.machineService.create(machineInput);
  }

  @Patch('update/:id')
  async update(
    @Param('id') machineId: string,
    @Body() fieldsToUpdate: TUpdateMachine,
  ) {
    return this.machineService.updateStatusAndLocation({
      machineId,
      fieldsToUpdate,
    });
  }

  @Get('find-by-name/:name')
  async searchByName(@Param('name') name: string) {
    return this.machineService.searchByName(name);
  }

  @Get('find-by-id/:id')
  async searchById(@Param('id') machineId: string) {
    return this.machineService.searchById(machineId);
  }

  @Get('logs')
  async getLogs() {
    return this.machineService.getLogs();
  }
}
