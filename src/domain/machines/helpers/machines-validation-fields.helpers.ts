import { BadRequestException } from '@nestjs/common';
import { StatusType } from '../interfaces';

export class MachinesValidationFieldsHelper {
  static validateStatusFieldType(status: string) {
    if (status && !Object.values(StatusType).includes(status as StatusType)) {
      const message = `Status inválido: ${status}. Status permitidos: ${Object.values(StatusType).join(', ')}`;
      throw new BadRequestException(message);
    }
  }
}
