import { Pipe, PipeTransform } from '@angular/core';
import { ItemCarrito } from '../models/item-carrito';

@Pipe({
  name: 'totalCarrito',
  standalone: true
})
export class TotalCarritoPipe implements PipeTransform {

  transform(items: ItemCarrito[] | null): number {

    if (!items) return 0;

    return items.reduce(
      (total, item) =>
        total + (Number(item.producto.precio) * item.cantidad),
      0
    );

  }

}
