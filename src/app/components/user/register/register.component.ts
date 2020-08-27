import { Component, OnInit } from '@angular/core';
import {faBookOpen, faCalendarDay, faChessKing, faEnvelope, faGlobeEurope, faUser, faUserNinja} from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../../../service/authentication.service';
import {UserService} from '../../../service/user.service';
import {Router} from '@angular/router';
import {User} from '../../../model/User';
import {RegisterRequest} from '../../../model/RegisterRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  faGlobe = faGlobeEurope;
  faUser = faUser;
  faPassword = faUserNinja;
  faEnvelope = faEnvelope;
  faDate = faCalendarDay;
  faChess = faChessKing;
  faBootstrap = faBookOpen;
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(value: any): void {
    const registerRequest: RegisterRequest = new RegisterRequest();
    registerRequest.username = value.username;
    registerRequest.firstName = value.firstName;
    registerRequest.lastName = value.lastName;
    registerRequest.country = value.country;
    registerRequest.dateOfBirth = value.dateOfBirth;
    registerRequest.email = value.email;
    registerRequest.password = value.password;
    registerRequest.username = value.username;
    this.authenticationService.register(registerRequest).subscribe(
      data => {
        this.authenticationService.saveAuthenticationData(data);
        this.router.navigateByUrl('');
      }
    );
  }
}
