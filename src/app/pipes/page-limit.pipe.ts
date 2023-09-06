import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pageLimit'
})
export class PageLimitPipe implements PipeTransform {
  transform(items: any[], limit: number): any[] {
    if (!items || !limit) {
      return items;
    }

    return items.slice(0, limit);
  }
}
