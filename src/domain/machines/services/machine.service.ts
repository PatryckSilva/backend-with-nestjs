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
import { SocketGateway } from 'src/socketgateway/gateway';
import { MachinesValidationFieldsHelper } from '../helpers/machines-validation-fields.helpers';

@Injectable()
export class MachinesService {
  @Inject('IMachinesRepository')
  private readonly machinesRepository: IMachinesRepository;

  @Inject(SocketGateway)
  private readonly socketGateway: SocketGateway;

  async executeFindAll(status?: string) {
    if (!status) {
      const response = await this.machinesRepository.findAll();
      return response;
    }

    const response = await this.machinesRepository.findByStatus(
      status as StatusType,
    );

    return response;
  }

  async executeCreate(machineBody: TCreateMachine) {
    const { location, name, status } = machineBody;

    MachinesValidationFieldsHelper.validateField(name, 'O Nome da máquina');
    MachinesValidationFieldsHelper.validateField(
      location,
      'A localização da máquina',
    );
    MachinesValidationFieldsHelper.validateField(status, 'O status da Máquina');

    const existingMachineByName =
      await this.machinesRepository.findByName(name);

    if (existingMachineByName) {
      const message = `Já existe uma máquina com esse nome`;
      throw new BadRequestException(message);
    }

    MachinesValidationFieldsHelper.validateStatusFieldType(status as string);

    const machine = await this.machinesRepository.create(machineBody);

    return machine;
  }

  async executeUpdateStatus({
    machineId,
    fieldsToUpdate,
  }: {
    machineId: string;
    fieldsToUpdate: TUpdateMachine;
  }) {
    if (!machineId) {
      MachinesValidationFieldsHelper.validateField(
        machineId,
        'O Id da máquina',
      );
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

  async executeFindByName(name: string) {
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

  async executeFindById(id: string) {
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

  async findRandomMachine() {
    const response = await this.executeFindAll();
    if (response.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * response.length);
    return response[randomIndex];
  }

  // @Cron('*/5 * * * * *')
  async simulateTelemetry() {
    const machine = await this.findRandomMachine();
    if (!machine) return;

    const updatedData = {
      location: `Random-Loc-${Math.floor(Math.random() * 100)}`,
      status: ['OPERATING', 'MAINTENANCE', 'OFF'][
        Math.floor(Math.random() * 3)
      ] as StatusType,
    };

    await this.executeUpdateStatus({
      machineId: machine.id,
      fieldsToUpdate: updatedData,
    });

    this.socketGateway.server.emit('newUpdate', {
      machineId: machine.id,
      ...updatedData,
    });

    const allMachines = await this.executeFindAll();

    this.socketGateway.server.emit('requestMachineList', allMachines);

    console.log(
      `Machine ${machine.id} updated: Location=${updatedData.location}, Status=${updatedData.status}`,
    );
  }
}
