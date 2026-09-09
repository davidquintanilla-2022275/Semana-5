import { Component } from '@angular/core';
import { Productos } from './productos/productos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Productos],
  template: '<app-productos></app-productos>'
})
export class App {
}