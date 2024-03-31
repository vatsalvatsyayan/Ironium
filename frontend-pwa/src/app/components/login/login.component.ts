import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() : void {  
    this.handleLogin();
  }

  handleLogin() {
    
    if(!this.authService.isAuthenticated())
    {
      this.authService.login();
    }
    else
    {
      this.router.navigate(['']);
    }

  }


}
