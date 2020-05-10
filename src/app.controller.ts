import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  index() {
    //
  }

  @Get('sender')
  @Render('index')
  sender() {
    //
  }

  @Get('receiver')
  @Render('index')
  receiver() {
    //
  }
}
