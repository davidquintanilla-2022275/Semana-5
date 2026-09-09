import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  agregarProducto(producto: Producto): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto);
  }
}