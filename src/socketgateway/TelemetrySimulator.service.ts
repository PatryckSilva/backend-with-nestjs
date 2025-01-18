import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MachinesService } from 'src/domain/machines/services/machine.service';
import { SocketGateway } from './gateway';
import { StatusType } from 'src/domain/machines/interfaces';

@Injectable()
export class TelemetrySimulatorService {
  constructor(
    private readonly machinesService: MachinesService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Cron('*/5 * * * * *')
  async simulateTelemetry() {
    const machine = await this.machinesService.findRandomMachine();
    if (!machine) return;

    const updatedData = {
      location: `Random-Loc-${Math.floor(Math.random() * 100)}`,
      status: ['OPERATING', 'MAINTENANCE', 'OFF'][
        Math.floor(Math.random() * 3)
      ] as StatusType,
    };

    await this.machinesService.executeUpdateStatus({
      machineId: machine.id,
      fieldsToUpdate: updatedData,
    });

    this.socketGateway.server.emit('telemetryUpdate', {
      machineId: machine.id,
      ...updatedData,
    });

    console.log(
      `Machine ${machine.id} updated: Location=${updatedData.location}, Status=${updatedData.status}`,
    );
  }
}
