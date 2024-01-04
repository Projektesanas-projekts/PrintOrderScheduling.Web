import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Order } from '../components/order-form/order';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com';
  private authSecretKey = 'Bearer Token';

  private currentProduct = new BehaviorSubject<any>(null);
  currentProduct$ = this.currentProduct.asObservable();

  private orderSubmitionSuccess = new BehaviorSubject<boolean>(false);
  orderSubmitionSuccess$ = this.orderSubmitionSuccess.asObservable();

  constructor(private http: HttpClient) {
  }

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem(this.authSecretKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });
  }

  getProducts() : Observable<any[]>{
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/products`, { headers });
  }

  addNewOrder(): void {
    //TODO: Change to form data
    let orderForm: Order = {
      amount: 1,
      pageCount: 20,
      coverType: "Strong",
      bookName: "TestBook",
      bindingType: "Strong",
      format: "Format",
      sizeX: 220,
      sizeY: 150
    }
    
    this.http.post("http://localhost:8080/api/order/create", orderForm).subscribe((response: any) => {
      if(response) {
        this.orderSubmitionSuccess.next(true);
      }
    });

  }

  selectProduct(product: any) {
    this.currentProduct.next(product);
  }


  getProductDetailById(id : number){
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/products/` + id, { headers })
  }
}
