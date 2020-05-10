import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('sender')
  @Render('index')
  sender() {
    return { message: this.appService.getHello() };
  }

  @Get('receiver')
  @Render('index')
  receiver() {
    return { message: this.appService.getHello() };
  }
}
