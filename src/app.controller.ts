import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async getAPI() {
    return { message: 'test default route ' };
  }
}
