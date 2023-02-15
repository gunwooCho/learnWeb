import { Controller, Get, Render, Request, UseFilters, UseGuards } from '@nestjs/common';
import express from 'express';

import ViewAuthFilter from '../filters/ViewAuthFilter';
import JwtAuthGuard from '../modules/auth/providers/jwt/guard';

@Controller()
@UseFilters(ViewAuthFilter)
@UseGuards(JwtAuthGuard)
export default class AppController {
  @Get()
  @Render('home')
  public index(@Request() req: express.Request) {
    const { user = {} } = req as any;
    return { name: user.username };
  }
}
