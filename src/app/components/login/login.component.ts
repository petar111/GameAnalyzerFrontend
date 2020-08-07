import { Component, OnInit } from '@angular/core';

import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {faCheckDouble} from '@fortawesome/free-solid-svg-icons/faCheckDouble';
import {faKey} from '@fortawesome/free-solid-svg-icons/faKey';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerIcon = faCheckDouble;
  signInIcon = faKey;
  constructor() { }

  ngOnInit(): void {
  }

}
