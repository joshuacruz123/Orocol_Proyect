import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
//import { Productos } from '../../../models/productos';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {
 
  form!: FormGroup;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      TipoOro: new FormControl('', [Validators.required])
    });
  }

  get f(){
    return this.form.controls;
  }

  crearProducto(){
    console.log(this.form.value);
    this.productoService.registrarProducto(this.form.value).subscribe((res:any) => {
      this.toastr.success('Producto Creado', 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.router.navigate(['/productos']);
    })
  }
}
