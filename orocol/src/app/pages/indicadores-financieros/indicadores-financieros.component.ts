import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../shared/encabezado/encabezado.component';
import { NavAdminComponent } from '../../shared/navbar-usuarios/nav-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { CompraService } from '../../core/services/compra.service';
import { Chart, registerables } from 'chart.js';

interface IndicadorFinanciero {
  fecha: string;
  valorTotal: number;
}

@Component({
  selector: 'app-indicadores-financieros',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavAdminComponent, PieComponent, MatIconModule],
  templateUrl: './indicadores-financieros.component.html',
  styleUrl: './indicadores-financieros.component.css'
})
export class IndicadoresFinancierosComponent implements OnInit {
  constructor(private compraService: CompraService) {
    // Registrar todos los componentes de Chart.js
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.compraService.obtenerIndicadoresFinancieros().subscribe((data: IndicadorFinanciero[]) => {
      this.createChart(data);
    });
  }

  createChart(data: IndicadorFinanciero[]): void {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    const labels = data.map(item => item.fecha);
    const values = data.map(item => item.valorTotal);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Valor Total de Ventas',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
