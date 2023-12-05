import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com';
  private authSecretKey = 'Bearer Token';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem(this.authSecretKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });
  }

  getProducts() : Observable<any[]>{
    const headers = this.getHeaders();
    // For test purpose
    this.logIn();
    
    return this.http.get<any[]>(`${this.apiUrl}/products`, { headers });
  }

  logIn(): void {
    let mockData: {username: string, password: string};
    mockData = {
      username: "Ass",
      password: "Hole"
    };

    this.http.post("http://hiype.id.lv:8080/api/user/create", mockData).subscribe((response: any) => {
      console.log(response);
    });
  }

  getProductDetailById(id : number){
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/products/` + id, { headers })
  }
}
