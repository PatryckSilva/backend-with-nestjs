import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private readonly logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs/app.log' }),
    ],
  });

  info(message: string, meta?: object) {
    this.logger.info(message, meta);
  }

  error(message: string, meta?: object) {
    this.logger.error(message, meta);
  }
}
