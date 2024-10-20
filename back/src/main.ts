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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);

  // Habilitar CORS para permitir solicitudes desde http://localhost:3001
  app.enableCors({
    origin: 'http://localhost:3000',  // Permitir solicitudes desde este origen
    methods: 'GET,POST,PUT,DELETE',    // Métodos HTTP permitidos
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],                 // Permitir cookies o autenticación
  });

  // Habilitar validaciones globales
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Configuración de Swagger
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
