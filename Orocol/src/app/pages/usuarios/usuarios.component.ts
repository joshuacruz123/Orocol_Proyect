import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Persona } from 'src/app/interfaces/usuarios';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarPersonaComponent } from '../../components/agregar-editar-persona/agregar-editar-persona.component';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'tipoDocumento', 'documento', 'fechaNacimiento', 'Acciones'];
  dataSource = new MatTableDataSource<Persona>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _personaService: ServicioService){
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  obtenerUsuarios() {
    this._personaService.getPersonas().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
