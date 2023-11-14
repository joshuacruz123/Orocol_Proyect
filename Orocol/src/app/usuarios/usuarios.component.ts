import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import { Persona } from 'src/app/interfaces/usuarios';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarPersonaComponent } from '../components/agregar-editar-persona/agregar-editar-persona.component';
//numero documento, apellido
const Lista_Personas: Persona[] = [
  { nombre: "Joshua", apellido: "Cruz", tipoDocumento: "TI", documento: 1234451111, fechaNacimiento: new Date() },
  { nombre: "Joshua", apellido: "Cruy", tipoDocumento: "TI", documento: 1234459990, fechaNacimiento: new Date() },
  { nombre: "Joshua", apellido: "Crux", tipoDocumento: "TI", documento: 1234458888, fechaNacimiento: new Date() },
  { nombre: "Joshua", apellido: "Cruw", tipoDocumento: "TI", documento: 1234457777, fechaNacimiento: new Date() },
  { nombre: "Joshua", apellido: "Cruv", tipoDocumento: "TI", documento: 1032678564, fechaNacimiento: new Date() },
  { nombre: "Joshua", apellido: "Cruu", tipoDocumento: "TI", documento: 1234454545, fechaNacimiento: new Date() },
  { nombre: "Joshua", apellido: "Crut", tipoDocumento: "TI", documento: 1234451234, fechaNacimiento: new Date() },
  { nombre: "Joshua", apellido: "Crus", tipoDocumento: "TI", documento: 1234452344, fechaNacimiento: new Date() },
  { nombre: "Joshua", apellido: "Crur", tipoDocumento: "TI", documento: 1234452344, fechaNacimiento: new Date() },
  { nombre: "Joshua", apellido: "Cruq", tipoDocumento: "TI", documento: 1234456666, fechaNacimiento: new Date() }
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'tipoDocumento', 'documento', 'fechaNacimiento', 'Acciones'];
  dataSource = new MatTableDataSource<Persona>(Lista_Personas);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "Cantidad de registros";
  }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(public dialog: MatDialog){
    
  }

  addEditPersona() {
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {
      width: '550px',
      disableClose: true
    });

  dialogRef.afterClosed().subscribe(result => {
    
  })
  }
}
