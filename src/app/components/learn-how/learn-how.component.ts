import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger, useAnimation} from '@angular/animations';
import {jello, rubberBand, tada} from 'ng-animate';

@Component({
  selector: 'app-learn-how',
  templateUrl: './learn-how.component.html',
  styleUrls: ['./learn-how.component.css'],
  animations: [
    trigger('change-bg', [
      state('one', style({
        background: 'while',
        color: 'black'
      })),
      state('two', style({
        background: 'gray',
        color: 'white'
      })),
      transition('* => *', animate(500))]),
    trigger('change-size', [
      state('one', style({
        background: 'while',
        color: 'black'
      })),
      state('two', style({
        background: 'gray',
        color: 'white'
      })),
      transition('* => *', animate(500))]),
    trigger('rubber', [
      state('one', style({
      })),
      state('two', style({
      })), transition('*=>*', useAnimation(rubberBand))]),
    trigger('jello', [
      state('one', style({
      })),
      state('two', style({
      })), transition('*=>*', useAnimation(jello))])
  ]
})
export class LearnHowComponent implements OnInit {

  public animationSignal = false;
  animationSignalCreate = false;
  animationRow1 = true;
  animationRow2 = true;
  animationRow3 = true;
  constructor() { }

  ngOnInit(): void {
  }

}
