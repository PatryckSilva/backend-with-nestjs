import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MachinesService } from './services/machine.service';
import { TCreateMachine, TUpdateMachine } from './interfaces';

@Controller('machines')
export class MachinesController {
  @Inject(MachinesService)
  private readonly machineService: MachinesService;

  @Get()
  async findAll(@Query('status') status?: string) {
    return this.machineService.executeFindAll(status);
  }

  @Post('create')
  async create(@Body() machineInput: TCreateMachine) {
    return this.machineService.executeCreate(machineInput);
  }

  @Patch('update/:id')
  async update(
    @Param('id') machineId: string,
    @Body() fieldsToUpdate: TUpdateMachine,
  ) {
    return this.machineService.executeUpdateStatus({
      machineId,
      fieldsToUpdate,
    });
  }

  @Get('find-by-name/:name')
  async findByName(@Param('name') name: string) {
    return this.machineService.executeFindByName(name);
  }

  @Get('find-by-id/:id')
  async findById(@Param('id') machineId: string) {
    return this.machineService.executeFindById(machineId);
  }
}
