import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isAuthenticated = false;
  private authSecretKey = 'Bearer Token';

  private logInState = new BehaviorSubject<any>(false);
  logInState$ = this.logInState.asObservable();

  private userId = new BehaviorSubject<number>(0);
  userId$ = this.userId.asObservable();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }
  
  // Use this to send req with validation
  logIn(username: string, password: string): any {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    this.http.post("http://localhost:8080/api/user/authenticate", formData).subscribe((response: any) => {
      this.userId.next(response)
      if(response) {
        this.logInState.next(true)
        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpheWRlZXAgUGF0aWwiLCJpYXQiOjE1MTYyMzkwMjJ9.yt3EOXf60R62Mef2oFpbFh2ihkP5qZ4fM8bjVnF8YhA'; // Generate or receive the token from your server
        localStorage.setItem(this.authSecretKey, authToken);
        this.toastr.success("Welcome, " + username + "!");
        this.isAuthenticated = true;
      } else {
        this.toastr.error("Wrong username or password!");
      }
    });
  }

  // Use this to login without validation (just type anything in username and pass fields)

  // logIn(username: string, password: string): any {
  //     this.logInState.next(true)
  //       const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpheWRlZXAgUGF0aWwiLCJpYXQiOjE1MTYyMzkwMjJ9.yt3EOXf60R62Mef2oFpbFh2ihkP5qZ4fM8bjVnF8YhA'; // Generate or receive the token from your server
  //       localStorage.setItem(this.authSecretKey, authToken);
  //       this.toastr.success("Welcome, " + username + "!");
  //       this.isAuthenticated = true;
  // }
  
  addUser(username: string, password: string): void {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    this.http.post("http://localhost:8080/api/user/create", formData).subscribe((response: any) => {
      if(response) {
        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpheWRlZXAgUGF0aWwiLCJpYXQiOjE1MTYyMzkwMjJ9.yt3EOXf60R62Mef2oFpbFh2ihkP5qZ4fM8bjVnF8YhA'; // Generate or receive the token from your server
        localStorage.setItem(this.authSecretKey, authToken);
        this.isAuthenticated = true;
        this.logIn(username,password);
      } else {
        this.logInState.next(false);
      }
    });
  }

  isAuthenticatedUser(): boolean {
    return localStorage.getItem(this.authSecretKey) ? true : false;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
    this.logInState.next(false)
  }
}