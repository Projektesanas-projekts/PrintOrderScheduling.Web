import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm?: any;
  registerForm?: any;
  registerPasswordMismatch: boolean = false;
  showRegistrationWindow: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });


    this.authService.logInState$.subscribe((state:boolean) => {
      if(state) {
        this.router.navigate(['/product-list']);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
     this.authService.logIn(this.loginForm.get('username').value, this.loginForm.get('password').value)
    }
    if (this.registerForm.valid) {
      if(this.registerForm.get('password').value == this.registerForm.get('confirmPassword').value) {
        this.authService.addUser(this.registerForm.get('username').value, this.registerForm.get('password').value)
      } else {
        this.registerPasswordMismatch = true;
        this.toastr.error("Password mismatch or whatever, change me later");
      }
    }
  }
}
