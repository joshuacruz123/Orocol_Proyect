import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../pie/pie.component';
import { ProductoService } from '../../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { ProductosInterface } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatIconModule, PieComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
}) 
export class ProductosComponent implements OnInit {

  productList: ProductosInterface[] = [];
  sinLista = undefined;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.consultarProductos()
  }

  consultarProductos() {
    this.productoService.consultarProductos().subscribe({
      next: (result) => {
        this.productList = result;
      },
      error: (err)=>{
        console.log(err);
      }
    }); 
  }

  inactivarProducto(id: number) {
    const nuevoEstado = 'Disponible';
    this.productoService.inactivarProducto(id, nuevoEstado).subscribe({
      next: () => {
        this.toastr.success('Producto inactivado correctamente');
        // Actualizar la lista de productos después de inactivar uno
        this.consultarProductos();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error al inactivar el producto');
      }
    });
  }
  
  activarProducto(id: number) {
    const nuevoEstado = 'Disponible';
    this.productoService.activarProducto(id, nuevoEstado).subscribe({
      next: () => {
        this.toastr.success('Producto activado correctamente');
        this.consultarProductos();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error al inactivar el producto');
      }
    });
  }
}
