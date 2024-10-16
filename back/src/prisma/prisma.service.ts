import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  // Conectar a la base de datos cuando el módulo se inicializa
  async onModuleInit() {
    await this.$connect();
  }

  // Desconectar de la base de datos cuando el módulo se destruye
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
