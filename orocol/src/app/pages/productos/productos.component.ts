import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../pie/pie.component';
import { Productos } from '../../models/productos';
import { ProductoService } from '../../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatIconModule, PieComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
}) 
export class ProductosComponent implements OnInit {

  productos: Productos[] = [];

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
      
  }

  listarProductos(): void {
    this.productoService.consultarProductos().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    )
  }
}
