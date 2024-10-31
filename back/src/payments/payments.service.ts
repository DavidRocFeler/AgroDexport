import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Suponiendo que usas Prisma para la base de datos
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".env" });

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService, 
    private readonly httpService: HttpService) {}

  // Actualiza el estado del pago en la base de datos
  async updatePaymentByTransactionId(transactionId: string, status: string, isVerified: boolean) {
    return this.prisma.payment.updateMany({
      where: { transaction_id: transactionId },
      data: {
        status,
        is_verified: isVerified,
        updated_at: new Date(),
      },
    });
  }
  
  // Obtiene el token de acceso de PayPal
  async getAccessToken(): Promise<string> {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response$ = this.httpService.post(
        'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const response = await lastValueFrom(response$);
      return response.data.access_token;
  }
}
