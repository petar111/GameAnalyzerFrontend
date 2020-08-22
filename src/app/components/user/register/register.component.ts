import { Component, OnInit } from '@angular/core';
import {faBookOpen, faCalendarDay, faChessKing, faEnvelope, faGlobeEurope, faUser, faUserNinja} from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../../../service/authentication.service';
import {UserService} from '../../../service/user.service';
import {Router} from '@angular/router';
import {User} from '../../../model/User';

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
    const user: User = new User();
    user.username = value.username;
    user.firstName = value.firstName;
    user.lastName = value.lastName;
    user.country = value.country;
    user.dateOfBirth = value.dateOfBirth;
    user.email = value.email;
    user.password = value.password;
    user.username = value.username;
    this.authenticationService.register(user).subscribe(
      data => {
        this.authenticationService.saveAuthenticationData(data);
        this.router.navigateByUrl('');
      }
    );
  }
}
