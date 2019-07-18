import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConvert'
})
export class CurrencyConvertPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (value/70).toFixed(2);
  }

}
