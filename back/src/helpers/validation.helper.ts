import { BadRequestException } from '@nestjs/common';

type ValidationType = 'exists' | 'notExists';

// Función genérica para validar la existencia o no de un valor
export function validateExists(value: any, type: ValidationType, message: string): void {
  if (type === 'exists' && value) {
    throw new BadRequestException(message);
  }
  if (type === 'notExists' && !value) {
    throw new BadRequestException(message);
  }
}

// Validación para verificar que el cuerpo de la solicitud no esté vacío
export function validateRequestBodyNotEmpty(updateData: any): void {
  if (!Object.keys(updateData).length) {
    throw new BadRequestException('El cuerpo de la solicitud no puede estar vacío');
  }
}
