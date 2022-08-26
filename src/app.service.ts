/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { createUser } from './dto/create.dto';
import { userCreated } from './events/user-created.event';

@Injectable()
export class AppService {

  constructor(private schedulerRegistry: SchedulerRegistry, private eventEmitter: EventEmitter2) { }

  private readonly logger = new Logger(AppService.name);

  async createUser(create: createUser) {
    this.logger.log('Creating user', create);
    this.eventEmitter.emit('user.created', new userCreated("45", create.email));
  }

  @OnEvent('user.created')
  welcomeNewUser(payload: userCreated) {
    this.logger.log('Welcoming new user', payload.userEmail);
  }

  @OnEvent('user.created')
  sendGiftToNewUser(payload: userCreated) {
    this.logger.log('sending Gift to new user', payload.userEmail);
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: "deleteExpiredUsers" })
  deleteExpiresUser() {
    this.logger.log('delete Expires User');
  }

}
