import { Component, OnInit } from '@angular/core';
import {transition, trigger, useAnimation} from '@angular/animations';
import {bounce, fadeInLeft} from 'ng-animate';
declare const myTest: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce))]),
    trigger('fadeInLeft', [transition('*=>*', useAnimation(fadeInLeft))])
  ]
})
export class HomeComponent implements OnInit {
  bounce: any;
  fadeInLeft: any;


  constructor() { }

  ngOnInit(): void {
  }

}
