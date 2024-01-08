import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Order } from '../components/order-form/order';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080';
  private authSecretKey = 'Bearer Token';

  private currentProduct = new BehaviorSubject<any>(null);
  currentProduct$ = this.currentProduct.asObservable();

  private orderSubmitionSuccess = new BehaviorSubject<boolean>(false);
  orderSubmitionSuccess$ = this.orderSubmitionSuccess.asObservable();

  constructor(private http: HttpClient) {
  }

  getProducts(userId: number): Observable<Order[]> {
    // Create HTTP parameters
    const params = new HttpParams().set('id', userId.toString());

    // Make the GET request with the parameters
    return this.http.get<Order[]>(`http://localhost:8080/api/order/all`, { params });
}

  addNewOrder(): void {
    //TODO: Change to form data
    let orderForm: Order = {
      userId: 152,
      amount: 4,
      pageCount: 100,
      coverType: "Weak",
      bookName: "TestBook2",
      bindingType: "QAEf",
      format: "Format",
      sizeX: 240,
      sizeY: 110
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
}
