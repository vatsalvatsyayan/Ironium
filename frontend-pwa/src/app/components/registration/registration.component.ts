import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/common/user';
import { BagService } from 'src/app/services/bag.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { RegistrationValidators } from 'src/app/validators/registration-validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent  implements OnInit {

  registrationFormGroup: FormGroup = new FormGroup({});
  
  storage: Storage = sessionStorage;
  
  constructor(private formBuilder: FormBuilder, 
              private registrationService: RegistrationService, 
              private router: Router,
              private bagService: BagService) { }

  ngOnInit() {
  
    const userEmail = this.storage.getItem('userEmail')!;

    this.registrationFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(1), RegistrationValidators.notOnlyWhitespace]],
        lastName: ['', [Validators.required, Validators.minLength(2), RegistrationValidators.notOnlyWhitespace]],
        email: [userEmail, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        phoneNumber: ['', [Validators.required, Validators.pattern('^([6-9]\\d{9})$'), RegistrationValidators.notOnlyWhitespace]],
        houseNo: ['', [Validators.required, Validators.minLength(2), RegistrationValidators.notOnlyWhitespace]],
        locality: ['', [Validators.required, Validators.minLength(2), RegistrationValidators.notOnlyWhitespace]],
      }),
    });

  }

  async onSubmit() {

    if (this.registrationFormGroup.invalid) {
      this.registrationFormGroup.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email, phoneNumber, houseNo, locality } = this.registrationFormGroup.value.user;
    const user = new User(firstName, lastName, email, phoneNumber, houseNo, locality);
    

    try {
      const createdUser = await firstValueFrom(this.registrationService.createUser(user));
      this.registrationFormGroup.reset();
      this.bagService.processOrder();
    } catch (error) {
      console.error('Error creating user:', error);
      this.registrationFormGroup.reset();
      // alert('Failure in registration, re-enter details');
    }

  }

  get firstName() { return this.registrationFormGroup.get('user.firstName'); }
  get lastName() { return this.registrationFormGroup.get('user.lastName'); }
  get email() { return this.registrationFormGroup.get('user.email'); }
  get phoneNumber() { return this.registrationFormGroup.get('user.phoneNumber'); }
  get houseNo() { return this.registrationFormGroup.get('user.houseNo'); }
  get locality() { return this.registrationFormGroup.get('user.locality'); }

}
