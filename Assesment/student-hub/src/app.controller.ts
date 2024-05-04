import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  checkHealth(): { status: string } {
    return { status: 'ok' };
  }
}
