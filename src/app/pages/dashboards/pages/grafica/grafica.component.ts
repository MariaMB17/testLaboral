import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit {
  /** Variables correspondientes a pie chart */
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Programador'], ['Comunity-Manager'], 'Diseñador grafico'];
  public pieChartData: SingleDataSet = [50, 30, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  /** Variables correspondiente a bar-chart */

  /*barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      labels: {
        render: 'percentage',
        precision: 2
      }
    },
  };*/
  barChartOptions: ChartOptions = {
    responsive: true,    
    scales: { yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 10,
          suggestedMin: 65,
        },
      }]
    },
    plugins: {
      render: 'percentage',
    }
  };
  barChartLabels: Label[] = ['Programador', 'Comunity-Manager', 'Diseñador grafico'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [60, 40, 35], label: 'Empresa Nutricars' },
    { data: [65, 45, 40], label: 'Ambrosia' }
  ];

  /** line chart */

  lineChartData: ChartDataSets[] = [
    { data: [85, 30, 10, 50, 77, 75], label: 'Empresa Nutricars' },
    { data: [10, 85, 50, 90, 20, 45], label: 'Ambrosia' },
  ];

  lineChartLabels: Label[] = ['Hombres', 'Mujeres'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(
    private _router: Router
  ) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
  }

  public login() {
    localStorage.clear()
    this._router.navigate(['/auth/login']); 
  }

  registrarUsuario() {
    localStorage.clear()
    this._router.navigate(['/security/users'])
  }

}
