
import * as crypto from 'crypto';
import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentService } from './payments.service'; 
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiTags('webhook')
  @Post('paypal')
  @ApiOperation({ summary: 'Handle PayPal webhook events' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        event_type: { type: 'string', example: 'PAYMENT.CAPTURE.COMPLETED' },
        resource: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'test_transaction_id' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Webhook processed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid signature' })
  async handlePayPalWebhook(@Req() req: Request, @Res() res: Response) {
    const headers = req.headers;
    const body = req.body;
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;

    // Verificación de la firma del webhook
    if (!this.verifyPayPalSignature(headers, body, webhookId)) {
      return res.status(HttpStatus.UNAUTHORIZED).send('Invalid signature');
    }

    // Procesa el evento según el tipo
    switch (body.event_type) {
        case 'PAYMENT.CAPTURE.COMPLETED':
          await this.paymentService.updatePaymentByTransactionId(
            body.resource.id,
            'COMPLETED',
            true,
          );
          break;
        case 'PAYMENT.CAPTURE.DECLINED':
          await this.paymentService.updatePaymentByTransactionId(
            body.resource.id,
            'DECLINED',
            false,
          );
          break;
        case 'PAYMENT.CAPTURE.DENIED':
          await this.paymentService.updatePaymentByTransactionId(
            body.resource.id,
            'DENIED',
            false,
          );
          break;
        case 'PAYMENT.CAPTURE.PENDING':
          await this.paymentService.updatePaymentByTransactionId(
            body.resource.id,
            'PENDING',
            false,
          );
          break;
      // Otros casos de manejo de eventos
      default:
        console.log('Evento de webhook no manejado:', body.event_type);
    }

    return res.status(HttpStatus.OK).send();
  }

  private verifyPayPalSignature(headers: any, body: any, webhookId: string): boolean {
    const expectedSignature = crypto
      .createHmac('sha256', webhookId)
      .update(
        `${headers['paypal-transmission-id']}|${headers['paypal-transmission-time']}|${webhookId}|${JSON.stringify(
          body,
        )}`,
      )
      .digest('base64');

    return headers['paypal-transmission-sig'] === expectedSignature;
  }
}
