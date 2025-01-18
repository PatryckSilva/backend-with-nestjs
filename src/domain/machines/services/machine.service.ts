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

@Injectable()
export class MachinesService {
  @Inject('IMachinesRepository')
  private readonly machinesRepository: IMachinesRepository;

  async executeFindAll() {
    const response = await this.machinesRepository.findAll();
    return {
      machines: response,
    };
  }

  async executeCreate(machineBody: TCreateMachine) {
    const { location, name, status } = machineBody;

    this.validateField(name, 'O Nome da máquina');
    this.validateField(location, 'A localização da máquina');
    this.validateField(status, 'O status da Máquina');

    const existingMachineByName =
      await this.machinesRepository.findByName(name);

    if (existingMachineByName) {
      const message = `Já existe uma máquina com esse nome`;
      throw new BadRequestException(message);
    }

    this.executeValidateStatusFieldType(status as string);

    const machine = await this.machinesRepository.create(machineBody);

    return {
      machine,
    };
  }

  async executeUpdateStatus({
    machineId,
    fieldsToUpdate,
  }: {
    machineId: string;
    fieldsToUpdate: TUpdateMachine;
  }) {
    if (!machineId) {
      this.validateField(machineId, 'O Id da máquina');
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

    this.executeValidateStatusFieldType(status as string);

    const updatedMachine = await this.machinesRepository.update(
      machineId,
      fieldsToUpdate,
    );

    return { updatedMachine };
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

    return { response };
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

    return { response };
  }

  async findRandomMachine() {
    const { machines } = await this.executeFindAll();
    if (machines.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * machines.length);
    return machines[randomIndex];
  }

  validateField(field: unknown, fieldName: string) {
    if (!field) {
      const message = `${fieldName} é obrigatório`;
      throw new BadRequestException(message);
    }
  }

  executeValidateStatusFieldType(status: string) {
    if (status && !Object.values(StatusType).includes(status as StatusType)) {
      const message = `Status inválido: ${status}. Status permitidos: ${Object.values(StatusType).join(', ')}`;
      throw new BadRequestException(message);
    }
  }
}
