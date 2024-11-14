import { Pipe, PipeTransform } from '@angular/core';
import { Imagen } from '../models/imagen';

@Pipe({
  name: 'sortFileByType'
})
export class SortFileByTypePipe implements PipeTransform {

  transform(images: Imagen[]): Imagen[] {
    return images.sort((a, b) => a.fileType.localeCompare(b.fileType));
  }

}
