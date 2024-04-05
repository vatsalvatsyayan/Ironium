import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration-router',
  templateUrl: './registration-router.component.html',
  styleUrls: ['./registration-router.component.scss'],
})
export class RegistrationRouterComponent  implements OnInit {

  constructor(private registrationService: RegistrationService, private router: Router) { 


  }

  storage: Storage = sessionStorage;

   async ngOnInit() {
      
    const userEmail = this.storage.getItem('userEmail')!;

    if(await this.registrationService.checkIfUserIsRegistered(userEmail))
    {
      console.log('user is registered, navigating onwards')
      this.router.navigate(['/tabs/tab2']);
    }
    else
    {
      this.router.navigate(['/register']);
    }

  }

}
