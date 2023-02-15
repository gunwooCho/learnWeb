import { Module } from '@nestjs/common';

import LoginController from './controllers/login.controller';

@Module({
  controllers: [LoginController],
})
export default class LoginModule { }
