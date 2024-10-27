import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { loggerGlobal } from './middlewares/logger.middleware';
import * as express from 'express';
import { config as dotenvConfig } from "dotenv";
import { join } from 'path';

dotenvConfig({ path: join(process.cwd(), '.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Convertir DOMAIN_FRONT a un array de dominios permitidos
const allowedOrigins = process.env.DOMAIN_FRONT?.split(',') || [];

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(loggerGlobal);

  app.use((req, res, next) => {
    const allowedOrigins = process.env.DOMAIN_FRONT;
    const origin = req.headers.origin as string;
  
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
  
    next();
  });
  

  console.log('CORS allowed origins:', allowedOrigins);
 
  app.enableCors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
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

  await app.listen(process.env.PORT);
}

bootstrap();
