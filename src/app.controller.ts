import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async getAPI() {
    return { message: 'API está rodando...' };
  }
}
