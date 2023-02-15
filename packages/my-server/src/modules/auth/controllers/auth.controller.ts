import {
  Controller, Get, HttpStatus, Post, Redirect, Request, Response, UseGuards,
} from '@nestjs/common';
import express from 'express';

import AuthService from '../providers/auth.service';
import KakaoAuthGuard from '../providers/kakao/gaurd';
import LocalAuthGuard from '../providers/local/guard';

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) { }

  @Post('local')
  @Redirect('/')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: express.Request, @Response() res: express.Response) {
    const token = await this.authService.login(req.user);

    res.cookie('Authentication', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
  }

  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() {
    return HttpStatus.OK;
  }

  @Get('kakao/redirect')
  @Redirect('/')
  @UseGuards(KakaoAuthGuard)
  async kakaoLoginCallback(@Request() req: express.Request, @Response() res: express.Response) {
    const token = this.authService.kakaoLogin(req.user);

    res.cookie('Authentication', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
  }
}
