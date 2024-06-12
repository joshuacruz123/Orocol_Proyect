import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../shared/encabezado/encabezado.component';
import { NavAdminComponent } from '../../shared/navbar-usuarios/nav-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { CompraService } from '../../core/services/compra.service';
import { Chart, registerables } from 'chart.js';
import { VentasService } from '../../core/services/ventas.service';

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
  volumenTotalOro: number | null = null;
  error: string | null = null;

  constructor(
    private compraService: CompraService,
    private ventaService: VentasService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.compraService.obtenerIndicadoresFinancieros().subscribe((data: IndicadorFinanciero[]) => {
      this.createChart(data);
    });
    this.compraService.obtenerVolumenTotalOro().subscribe({
      next: (data) => {
        this.volumenTotalOro = data.total;
        this.error = null;
      },
      error: (err) => {
        this.error = 'Error al obtener el volumen total de oro';
        console.error(err);
      }
    });
    this.ventaService.obtenerIndicadoresFinancierosVentas().subscribe((data: IndicadorFinanciero[]) => {
      this.createChartSales(data);
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
      type: 'line', // bar
      data: {
        labels: labels,
        datasets: [{
          label: 'Valor total de compras',
          data: values,
          backgroundColor: 'rgba(254, 254, 50, 1)',
          borderColor: 'rgba(197, 168, 3, 1)',
          borderWidth: 1,
          fill: false, // fill: false,
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

  createChartSales(data: IndicadorFinanciero[]): void {
    const canvas = document.getElementById('myChartSales') as HTMLCanvasElement;
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
          label: 'Valor total de las ventas',
          data: values,
          backgroundColor: 'rgba(248, 50, 50, 0.744)',
          borderColor: 'rgba(195, 0, 0, 1)',
          borderWidth: 1,
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
