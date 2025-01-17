import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { MachinesService } from './services/machine.service';
import { TPrismaMachineInput } from './interfaces';

@Controller('machines')
export class MachinesController {
  @Inject(MachinesService)
  private readonly machineService: MachinesService;

  @Get()
  async findAll() {
    return this.machineService.executeFindAll();
  }

  @Post('/create')
  async create(@Body() machineInput: TPrismaMachineInput) {
    return this.machineService.executeCreateMachine(machineInput);
  }

  // @Get()
  // findAll(@Query('status') status?: string) {
  //   if (status) {
  //     return this.machineService.filterMachinesByStatus(status as any);
  //   }
  //   return this.machineService.findAllMachines();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.machineService.findMachineById(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto) {
  //   return this.machineService.updateMachine(id, updateMachineDto);
  // }
}
