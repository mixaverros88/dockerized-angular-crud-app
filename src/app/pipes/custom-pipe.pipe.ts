import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {

  transform(value: string): String {
    if ( value.length > 5 ) {
      return value.toUpperCase();
    } else {
      return value.toLocaleLowerCase();
    }
  }
}
