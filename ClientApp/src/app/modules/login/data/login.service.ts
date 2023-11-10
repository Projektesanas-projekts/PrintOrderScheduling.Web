import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoginSuccessful = new BehaviorSubject<boolean>(false);
  isLoginSuccessful$: Observable<boolean> = this.isLoginSuccessful.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  registerUser(username: any, password: any): void {
    // TODO: Comment out and try when CORS is done 
    // const url = "hiype.id.lv:8080/api/user/create"
    // const body = new HttpParams()
    //     .set('username', username)
    //     .set('password', password);
    //   this.http.post<any>(url, body.toString()).subscribe((response: boolean) => {
    //     console.log(response);
    //   });
    console.log(username + " " + password);
  }
}
