import { Pipe, PipeTransform } from '@angular/core';

// Fecha
import { format } from 'date-fns';

@Pipe({
  name: 'formDate'
})
export class FormDatePipe implements PipeTransform {

  transform(value: Date): any {
    let year = new Date(value).getUTCFullYear();
    let month = new Date(value).getUTCMonth();
    let day = new Date(value).getUTCDate();
  
    return format(new Date(year, month, day), 'dd/MM/yyyy');;
  }

}
