import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';

@Component({
  selector: 'app-boulder-info',
  templateUrl: './boulder-info.page.html',
  styleUrls: ['./boulder-info.page.scss'],
})
export class BoulderInfoPage implements OnInit {
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    const myChart = new Chart('myChart', {
      type: 'pie',
      data: {
        labels: ['Flash', '2º intento', '3er intento', 'Más de 3 intentos'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 50, 100, 70],
            backgroundColor: [
              '#f2cf66',
              '#ff9f40',
              '#f23d4c',
              '#5a2642',
            ],
            borderWidth: 0
          },
        ],
      },
    });
  }
}
