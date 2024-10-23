// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { ValidationPipe } from '@nestjs/common'; // Importa ValidationPipe

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Se habilitaron los pipes 
//   app.useGlobalPipes(new ValidationPipe({
//       transform: true, 
//       whitelist: true, 
//       forbidNonWhitelisted: true, 
//   }));

//   const swaggerConfig = new DocumentBuilder()
//     .setTitle("Agro D Exports")
//     .setDescription("Doumentacion api Agro d Exports")
//     .setVersion("1.0")
//     .addBearerAuth()
//     .build();

//   const document = SwaggerModule.createDocument(app, swaggerConfig);
//   SwaggerModule.setup("api", app, document);

//   await app.listen(3000);
// }

// bootstrap();

// // 

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { loggerGlobal } from './middlewares/logger.middleware';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(loggerGlobal);

 
  app.enableCors({
    origin: 'http://localhost:3000',  
    methods: 'GET,POST,PUT,DELETE',    
    credentials: true,                 // Permitir cookies o autenticación
    allowedHeaders: ['Content-Type', 'Authorization']
  });


  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));


  const swaggerConfig = new DocumentBuilder()
    .setTitle("Agro D Exports")
    .setDescription("Doumentacion api Agro d Exports")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  await app.listen(3002);
}

bootstrap();
