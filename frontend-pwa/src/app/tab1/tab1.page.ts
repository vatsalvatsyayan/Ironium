import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  userEmail! : string | undefined;
  
  constructor(private authService: AuthenticationService) {
  }

  ionViewWillEnter() {
      this.userEmail = this.authService.userEmail;
  }

}
