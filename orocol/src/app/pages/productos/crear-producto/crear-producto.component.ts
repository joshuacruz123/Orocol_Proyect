import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Productos } from '../../../models/productos';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent  implements OnInit {
 
  TipoOro = '';
  
  f: FormGroup;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { 
      this.f = this.formBuilder.group({
        TipoOro: ['', Validators.required] 
      });
    }

  ngOnInit() {
  }

  crearProducto(): void {
    const producto = new Productos(this.TipoOro);
    this.productoService.registrarProducto(producto).subscribe(
      data => {
        this.toastr.success('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/productos']);
      }
    );
  }
}
