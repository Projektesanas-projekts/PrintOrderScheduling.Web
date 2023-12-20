import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com';
  private authSecretKey = 'Bearer Token';

  private currentProduct = new BehaviorSubject<any>(null);
  currentProduct$ = this.currentProduct.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem(this.authSecretKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });
  }

  getProducts() : Observable<any[]>{
    this.logIn("fgedh", "fgdhrj")
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/products`, { headers });
  }

  selectProduct(product: any) {
    this.currentProduct.next(product);
  }
  
  logIn(username: string, password: string): void {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    this.http.post("http://localhost:8080/api/user/create", formData).subscribe((response: any) => {
      console.log(response);
    });
}


  getProductDetailById(id : number){
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/products/` + id, { headers })
  }
}
