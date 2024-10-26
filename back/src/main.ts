import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { loggerGlobal } from './middlewares/logger.middleware';
import * as express from 'express';
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".env" });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(loggerGlobal);

    // Middleware para manejar solicitudes preflight (OPTIONS)
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'https://agrodexports.onrender.com');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      if (req.method === 'OPTIONS') {
        return res.status(204).end();
      }
      next();
    });

  console.log('CORS origin:', process.env.DOMAIN_FRONT);
 
  app.enableCors({
    origin: 'https://agrodexports.onrender.com',  
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

  await app.listen(process.env.PORT);
}

bootstrap();
