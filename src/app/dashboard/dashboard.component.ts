import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { APIService } from '../../custom-components/http-service/service';
import { keys } from "../../constants/keys";
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'link', 'createdAt'];

  dataSource = [];
  chartData = [];
  clickedRows = new Set<Link>();
  constructor(private service: APIService) {
    this.getData();
  }

  private getData() {

    this.service.get(keys.apiAddress + 'query/getDailyLinksAsync')
      .then((data: any) => {
        console.log(JSON.parse(JSON.parse(data)));
        this.chartData = JSON.parse(JSON.parse(data));
        const dataDailySalesChart: any = {
          labels: _.map(this.chartData, 'id'),
          series: _.map(this.chartData, 'count')
        };
        const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        this.startAnimationForLineChart(dailySalesChart);
      });

    this.service.get(keys.apiAddress + 'query/getLastTenLinksAsync')
      .then((data: any) => {
        console.log(JSON.parse(JSON.parse(data)));
        this.dataSource = JSON.parse(JSON.parse(data));
      });

    const dataDailySalesChart: any = {
      labels: _.map(this.chartData, function (item) {
        return _.map(item, 'id')
      }),
      series: _.map(this.chartData, function (item) {
        return _.map(item, 'count')
      })
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  ngOnInit() {
  }

}

export class Link {
  constructor(id, longUrl, link, createdAt) {
    this.id = id;
    this.longUrl = longUrl;
    this.link = link;
    this.createdAt = createdAt;
  }
  public id: string;
  public longUrl: string;
  public link: string;
  public createdAt: string;
}