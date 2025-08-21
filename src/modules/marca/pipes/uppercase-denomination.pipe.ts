import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercaseDenominationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (
      typeof value === 'object' &&
      value !== null &&
      value.denominacion &&
      typeof value.denominacion === 'string'
    ) {
      value.denominacion = value.denominacion.toUpperCase();
    }
    return value;
  }
}
