import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent  implements OnInit {

  
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    
    if(this.authService.isAuthenticated())
    {
      this.authService.logout();
    }
    else
    {
      this.router.navigate(['/login']);
    }
    
  }

}
