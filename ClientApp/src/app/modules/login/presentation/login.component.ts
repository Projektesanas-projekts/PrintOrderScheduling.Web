import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../data/login.service';
import { Router } from '@angular/router';

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
    private loginService: LoginService,
    private route: Router
  ) {

  }

  submitForm(): void { 
    console.warn(this.profileForm.value);
    this.loginService.registerUser(this.profileForm.controls.username.getRawValue(),this.profileForm.controls.password.getRawValue())
  }

  skipToDashboard(): void { 
    this.route.navigate(['dashboard']);
  }

}
