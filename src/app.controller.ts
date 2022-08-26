/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { createUser } from './dto/create.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  create(@Body() body: createUser): Promise<void> {
    return this.appService.createUser(body);
  }
}
