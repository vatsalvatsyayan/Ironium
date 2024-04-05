import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = 'http://localhost:8080/api/users';

  private userWithEmail = this.baseUrl + '/search/findByEmail?email='
  
  constructor(private httpClient: HttpClient) { }

  async checkIfUserIsRegistered(email: string): Promise<boolean> {
    console.log('check if user is registered called');
    
    try {
      const response = await this.httpClient.get<User>(this.userWithEmail + email, { observe: 'response' }).toPromise();
      
      if (response!.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking user registration:', error);
      return false;
    }
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, user);
  }

}
