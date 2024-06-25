import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { IChartData } from '../stats';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie.component.html',
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() chartData: IChartData;

  public data: any;
  public options: any;

  ngOnInit() {
    this.buildChart();
  }

  ngOnChanges() {
    this.buildChart();
  }

  private buildChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor: string = documentStyle.getPropertyValue('--text-color');
    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };

    this.data = {
      labels: this.chartData?.labels || [],
      datasets: [
        {
          data: this.chartData?.values || [],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };
  }
}
