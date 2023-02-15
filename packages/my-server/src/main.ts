import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { RenderModule } from 'nest-next';
import Next from 'next';

import AppController from './controllers/app.controller';
import BlogController from './controllers/blog.controller';
import AuthModule from './modules/auth/auth.module';
import LoginModule from './modules/login/login.module';
import UsersModule from './modules/users/users.module';
import BlogService from './providers/blog.service';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
      }),
    ),
    AuthModule,
    UsersModule,
    LoginModule,
  ],
  controllers: [AppController, BlogController],
  providers: [BlogService],
})
class Root { }

async function bootstrap() {
  const server = await NestFactory.create(Root);

  server.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('nest-next-monorepo-quickstart')
    .setDescription('nest.js + next.js + yarn workspace(berry) + swagger')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(server, config);

  SwaggerModule.setup('api', server, document);

  await server.listen(3000);
}

bootstrap();
