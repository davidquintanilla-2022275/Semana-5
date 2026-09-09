import { Component } from '@angular/core';
import {FormBuilder,ReactiveFormsModule,Validators} from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ProductoService } from '../service/producto.service';
import { ItemCarrito } from '../models/item-carrito';
import { TotalCarritoPipe } from '../pipes/precio.pipe';

@Component({
  selector: 'app-productos',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    DecimalPipe,
    TotalCarritoPipe
  ],

  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

  mensaje = '';
  error = '';

  productoForm: any;

  carrito: ItemCarrito[] = [];


  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {

    this.productoForm = this.fb.group({

      nombre: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      descripcion: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],

      precio: [0, [
        Validators.required,
        Validators.min(1)
      ]],

      categoria: ['', [
        Validators.required
      ]],

      stock: [0, [
        Validators.required,
        Validators.min(0)
      ]]

    });

  }


  agregarProducto(): void {

    this.mensaje = '';
    this.error = '';

    if (this.productoForm.invalid) {

      this.productoForm.markAllAsTouched();

      this.error =
        'Por favor, completa correctamente todos los campos.';

      return;
    }


    const producto = {

      id_producto: 0,

      nombre: this.productoForm.value.nombre,

      descripcion: this.productoForm.value.descripcion,

      precio: Number(this.productoForm.value.precio),

      categoria: this.productoForm.value.categoria,

      stock: Number(this.productoForm.value.stock)

    };


    this.productoService.agregarProducto(producto).subscribe({

      next: (respuesta) => {

        console.log(
          'Producto registrado correctamente:',
          respuesta
        );


        const productoCarrito = {

          ...producto,

          id_producto:
            respuesta?.id_producto ?? producto.id_producto

        };


        const productoExistente =
          this.carrito.find(
            item =>
              item.producto.nombre === productoCarrito.nombre
          );


        if (productoExistente) {

          productoExistente.cantidad++;

        } else {

          this.carrito.push({

            producto: productoCarrito,

            cantidad: 1

          });

        }


        this.mensaje =
          'Producto registrado y agregado al carrito correctamente.';

        this.error = '';

        this.productoForm.reset({

          nombre: '',

          descripcion: '',

          precio: 0,

          categoria: '',

          stock: 0

        });

      },


      error: (error) => {

        console.error(
          'Error al registrar producto:',
          error
        );

        this.error =
          'No se pudo registrar el producto.';

        this.mensaje = '';

      }

    });

  }

  aumentarCantidad(item: ItemCarrito): void {

    if (item.cantidad < Number(item.producto.stock)) {

      item.cantidad++;

    }

  }

  disminuirCantidad(item: ItemCarrito): void {

    if (item.cantidad > 1) {

      item.cantidad--;

    }

  }

  eliminarDelCarrito(item: ItemCarrito): void {

    this.carrito =
      this.carrito.filter(
        producto => producto !== item
      );

  }

  vaciarCarrito(): void {

    this.carrito = [];

  }

  get cantidadTotal(): number {

    return this.carrito.reduce(

      (total, item) =>
        total + item.cantidad,

      0

    );

  }

  realizarCompra(): void {

    if (this.carrito.length === 0) {

      this.error =
        'El carrito está vacío.';

      return;

    }


    this.mensaje =
      'Compra realizada correctamente.';

    this.error = '';

    this.carrito = [];

  }

}

