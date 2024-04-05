import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable, catchError, firstValueFrom, from } from 'rxjs';

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
    sessionStorage.clear();
    this.auth.logout();
  }

  handleAuthentication(): void {
    sessionStorage.removeItem('isAuthenticated');
  
    firstValueFrom(this.auth.isAuthenticated$).then(
      (isAuthenticated) => {
          if (isAuthenticated) {
            sessionStorage.setItem('isAuthenticated', 'true');
            this.getUserDetails();
          } else {
            sessionStorage.setItem('isAuthenticated', 'false');
          }
    }).catch((error) => {
      // Handle errors
      console.log('Failure in handling user authentication');
    });
  }

  async getUserDetails(): Promise<void> {
    try {
      const user = await firstValueFrom(this.auth.user$);
      if (user) {
        this.userEmail = user.email;
        sessionStorage.setItem('userEmail', user.email!);
      }
    } catch (error) {
      console.log('could not get user email');
      // Handle errors
    }
  }

  isAuthenticated() : boolean {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  }

}
