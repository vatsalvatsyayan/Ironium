import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public username!: string;
  public userEmail!: string | undefined;

  storage: Storage = sessionStorage;
  
  constructor(private auth: AuthService, private router: Router) { }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.setItem('isAuthenticated', 'false');
    this.auth.logout();
  }

  handleAuthentication(): void {

    sessionStorage.removeItem('isAuthenticated');

    this.auth.isAuthenticated$.subscribe(
    (isAuthenticated) => {
      if(isAuthenticated)
      {
        sessionStorage.setItem('isAuthenticated', 'true');
        this.getUserDetails();
      }
      else
      {
        sessionStorage.setItem('isAuthenticated', 'false');
      }
    }
  );

  this.router.navigate(['/tabs/tab2']);

  }

  getUserDetails() {
    this.auth.user$.subscribe(
      (user) => {
        if (user)
        {
          // to be enhanced further
          this.userEmail = user.email;
        }
      }
    );

  }

  isAuthenticated() : boolean {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  }

}
