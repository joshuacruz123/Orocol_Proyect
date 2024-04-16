import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasInterface } from '../../../core/interfaces/compra.interface';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompraService } from '../../../core/services/compra.service';

@Component({
  selector: 'app-editar-compra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './editar-compra.component.html',
  styleUrl: './editar-compra.component.css'
})
export class EditarCompraComponent implements OnInit {

  IdCliente!: number;
  compras: ComprasInterface = { 
    IdCliente: 0,
    NombreCompleto: '',
    Empresa: '',
    Pais: '',
    CiudadMunicipio: '',
    FechaExportacion: new Date(),
    estadoCompra: '',
    salidaVentas: { IdSalidaVenta: 0, PesogrOro: 0 }
  }; 
  compraForm!: FormGroup;

  constructor(
    public compraService: CompraService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditarCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { IdCliente: number }
  ) {
    this.IdCliente = data.IdCliente;
  }

  ngOnInit(): void {
    this.compraService.consultarCompra(this.IdCliente).subscribe((data: ComprasInterface)=>{
      this.compras = data;
      this.compraForm = new FormGroup({
        NombreCompleto: new FormControl(this.compras.NombreCompleto, Validators.required),
        Empresa: new FormControl(this.compras.Empresa, Validators.required),
        Pais: new FormControl(this.compras.Pais, Validators.required),
        CiudadMunicipio: new FormControl(this.compras.CiudadMunicipio, Validators.required),
        FechaExportacion: new FormControl(this.compras.FechaExportacion, [Validators.required]),
        PesogrOro: new FormControl(this.compras.salidaVentas.PesogrOro, Validators.required)
      });
    }); 
  }

  get f(){
    return this.compraForm.controls;
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  editarCompra(){
    console.log(this.compraForm.value);
    this.compraService.editarCompra(this.IdCliente, this.compraForm.value).subscribe(
      response => {
        this.toastr.success(response.message, 'OK', {
          timeOut: 3000
        });
        this.dialogRef.close(true); 
      },
      error => {
        console.error('Error al editar la Compra', error);
        this.toastr.error(error.error.message, 'Error:', {
          timeOut: 3000
        });
      }
    )
  }
}
