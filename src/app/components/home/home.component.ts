import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger, useAnimation} from '@angular/animations';
import {bounce, fadeInLeft, slideInLeft} from 'ng-animate';
import * as CanvasJS from '../../../assets/js/canvasjs.min.js';
import {GameService} from '../../service/game.service';
declare const myTest: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('expandOnHover', [
      state('nonHover', style({
        width: '1%',
        height: '200px'
      })),
      state('hover', style({
        width: '100%',
        height: 'auto'
      })),
      transition('nonHover => hover', animate('0.5s 0.5s')),
      transition('hover => nonHover', animate(500))
    ]),
    trigger('bounce', [transition('* => *', useAnimation(bounce))]),
    trigger('fadeInLeft', [transition('*=>*', useAnimation(fadeInLeft))]),
    trigger('slideInLeft', [transition('*=>*', useAnimation(slideInLeft))])
  ]
})
export class HomeComponent implements OnInit {
  bounce: any;
  fadeInLeft: any;
  slideInLeft: any;
  expandOnHoverParagraph1 = false;
  expandOnHoverParagraph2 = false;
  expandOnHoverParagraph3 = false;
  expandOnHoverParagraph4 = false;
  public chartReady = false;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {

    this.gameService.getTodaysGameScores().subscribe(
      (data)  => {

        const dataPoints = [];
        data.forEach(gameScore => {
          dataPoints.push(
            {y : gameScore.totalPayoff, label : `#${gameScore.user.username} (${gameScore.game.name})`}
          );
        });

        this.chartReady = true;

        const chart = new CanvasJS.Chart('chartContainer', {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Game scores today'
          },
          data: [{
            type: 'column',
            dataPoints
          }]
        });

        chart.render();


      }
    );
  }

  onMouseEnterParagraph1($event: MouseEvent): void {
    this.expandOnHoverParagraph1 = true;
  }

  onMouseLeaveParagraph1($event: MouseEvent): void {
    this.expandOnHoverParagraph1 = false;
  }

  onMouseEnterParagraph2($event: MouseEvent): void {
    this.expandOnHoverParagraph2 = true;
  }

  onMouseLeaveParagraph2($event: MouseEvent): void {
    this.expandOnHoverParagraph2 = false;
  }

  onMouseEnterParagraph3($event: MouseEvent): void {
    this.expandOnHoverParagraph3 = true;
  }

  onMouseLeaveParagraph3($event: MouseEvent): void {
    this.expandOnHoverParagraph3 = false;
  }

  onMouseEnterParagraph4($event: MouseEvent): void {
    this.expandOnHoverParagraph4 = true;
  }

  onMouseLeaveParagraph4($event: MouseEvent): void {
    this.expandOnHoverParagraph4 = false;
  }
}
