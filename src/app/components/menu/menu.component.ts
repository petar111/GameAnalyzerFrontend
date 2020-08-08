import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public loggedUser: User;
  constructor() { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }

}
