import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../data/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  isRegistrationForm: boolean = false;

  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private loginService: LoginService
  ) {

  }

  submitForm(): void { 
    console.warn(this.profileForm.value);
    this.loginService.registerUser(this.profileForm.controls.username.getRawValue(),this.profileForm.controls.password.getRawValue())
  }

}
