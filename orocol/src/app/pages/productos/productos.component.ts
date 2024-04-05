import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../shared/encabezado/encabezado.component';
import { NavAdminComponent } from '../../shared/navbar-usuarios/nav-admin.component';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../core/services/producto.service';
import { ProductosInterface } from '../../core/interfaces/producto.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavAdminComponent, PieComponent, MatIconModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  productList: ProductosInterface[] = [];
  sinLista = undefined;
  productListFiltro: ProductosInterface[] = [];

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.consultarProductos();
  }

  consultarProductos() {
    this.productoService.consultarProductos().subscribe({
      next: (result) => {
        this.productList = result;
        this.productListFiltro = [...this.productList];
      },
      error: (err) => {
        console.log(err);
      }
    });
  } // Función para ver los productos

  buscarProducto(event: any) {
    const busqueda = event?.target?.value.trim().toLowerCase() || '';
    this.productListFiltro = this.productList.filter(producto =>
      producto.TipoOro.toLowerCase().includes(busqueda) ||
      producto.estadoProducto.toLowerCase().includes(busqueda)
    );
  }

  inactivarProducto(id: number) {
    const nuevoEstado = 'Disponible';
    let desactivarProducto;
    do {
      desactivarProducto = confirm("¿Deseas inactivar este producto?, si lo hace este producto no se va a vender.");
      if (desactivarProducto) {
        this.productoService.inactivarProducto(id, nuevoEstado).subscribe({
          next: () => {
            this.toastr.success('Producto inactivado correctamente');
            this.consultarProductos(); // Actualizar la lista de productos después de inactivar un producto
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('Error al inactivar el producto');
          }
        });
      } else {
        break;
      }
    } while (!desactivarProducto);
  } // Función para inactivar producto

  activarProducto(id: number) {
    const nuevoEstado = 'Disponible';
    let activarProducto;
    do {
      activarProducto = confirm("¿Deseas activar este producto?, si lo hace este producto va a estar disponible a la venta.");
      if (activarProducto) {
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
      } else {
        break;
      }
    } while (!activarProducto);
  } // Función para activar producto
}
