import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autocomplete'
})
export class AutocompletePipe implements PipeTransform {
  transform(list: string[], text: string): string[] | undefined {
    if (text.length < 2) {
      return undefined;
    }
    if (list.find(item => item.toLowerCase() === text)) {
      return undefined;
    }

    return list.filter(item => item.toLowerCase().includes(text));
  }
}
