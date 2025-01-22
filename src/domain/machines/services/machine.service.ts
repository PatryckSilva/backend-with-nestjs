import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IMachinesRepository,
  StatusType,
  TCreateMachine,
  TUpdateMachine,
} from '../interfaces';
import { Cron } from '@nestjs/schedule';
import { MachinesValidationFieldsHelper } from '../helpers/machines-validation-fields.helpers';
import { GetRealLocationHelper } from '../helpers/get-real-location.help';
import { LoggerService } from 'src/logger/logger.service';
import { SocketGateway } from 'src/infra/gateways/socket';

@Injectable()
export class MachinesService {
  @Inject('IMachinesRepository')
  private readonly machinesRepository: IMachinesRepository;

  @Inject(SocketGateway)
  private readonly socketGateway: SocketGateway;

  @Inject(LoggerService)
  private readonly logger: LoggerService;

  async searchAll() {
    const response = await this.machinesRepository.findAll();
    return response;
  }

  async create(machineBody: TCreateMachine) {
    const { location, name, status } = machineBody;

    if (!name) {
      const message = `O nome da máquina é obrigatório`;
      throw new BadRequestException(message);
    }

    if (!location) {
      const message = `A localização da máquina é obrigatória`;
      throw new BadRequestException(message);
    }

    if (!status) {
      const message = `O status da máquina é obrigatório`;
      throw new BadRequestException(message);
    }

    const existingMachineByName =
      await this.machinesRepository.findByName(name);

    if (existingMachineByName) {
      const message = `Já existe uma máquina com esse nome`;
      throw new BadRequestException(message);
    }

    MachinesValidationFieldsHelper.validateStatusFieldType(status as string);

    const machine = await this.machinesRepository.create(machineBody);

    const allMachines = await this.searchAll();

    this.socketGateway.server.emit('MachineList', allMachines);

    return machine;
  }

  async updateStatusAndLocation({
    machineId,
    fieldsToUpdate,
  }: {
    machineId: string;
    fieldsToUpdate: TUpdateMachine;
  }) {
    if (!machineId) {
      throw new BadRequestException('O Id da máquina é obrigatório');
    }

    const machineExists = await this.machinesRepository.findById(machineId);

    if (!machineExists) {
      throw new NotFoundException('Máquina não encontrada');
    }

    const { location, status } = fieldsToUpdate;

    if (!status && !location) {
      throw new BadRequestException(`Nenhum campo para atualizar`);
    }

    if (!status) {
      delete fieldsToUpdate.status;
    }

    if (!location) {
      delete fieldsToUpdate.location;
    }

    MachinesValidationFieldsHelper.validateStatusFieldType(status as string);

    const updatedMachine = await this.machinesRepository.update(
      machineId,
      fieldsToUpdate,
    );

    return updatedMachine;
  }

  async searchByName(name: string) {
    if (!name) {
      throw new BadRequestException('Nome é obrigatório');
    }

    const response = await this.machinesRepository.findByName(name);

    if (!response) {
      throw new NotFoundException(
        'Não foi encontrada uma máquina com esse nome',
      );
    }

    return response;
  }

  async searchById(id: string) {
    if (!id) {
      throw new BadRequestException('Nome é obrigatório');
    }

    const response = await this.machinesRepository.findById(id);

    if (!response) {
      throw new NotFoundException(
        'Não foi encontrada uma máquina com esse nome',
      );
    }

    return response;
  }

  async selectRandomMachine() {
    const response = await this.searchAll();
    if (response.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * response.length);
    return response[randomIndex];
  }

  async getLogs() {
    const logs = await this.machinesRepository.getMachineLogs();
    return logs;
  }

  @Cron('*/5 * * * * *')
  async simulateTelemetry() {
    try {
      const machine = await this.selectRandomMachine();
      if (!machine) {
        return this.socketGateway.server.emit('MachineList', []);
      }

      const randomLat = (Math.random() * 180 - 90).toFixed(6);
      const randomLng = (Math.random() * 360 - 180).toFixed(6);

      const location = await GetRealLocationHelper.getLocation({
        randomLat,
        randomLng,
      });

      const updatedData = {
        location,
        status: ['OPERATING', 'MAINTENANCE', 'OFF'][
          Math.floor(Math.random() * 3)
        ] as StatusType,
      };

      const updatedMachineResponse = await this.updateStatusAndLocation({
        machineId: machine.id,
        fieldsToUpdate: updatedData,
      });

      this.socketGateway.server.emit('newMachineUpdate', {
        ...updatedMachineResponse,
      });

      const allMachines = await this.searchAll();

      this.socketGateway.server.emit('MachineList', allMachines);

      await this.machinesRepository.createMachineLog(
        updatedMachineResponse,
        'atualizado',
      );

      this.logger.info('Máquinas atualizadas', {
        timestamp: new Date().toISOString(),
        machine: updatedMachineResponse,
      });
    } catch (err) {
      const _error = err as Error;
      this.logger.error('Erro ao simular telemetria', {
        timestamp: new Date().toISOString(),
        error: _error.message,
      });
    }
  }
}
