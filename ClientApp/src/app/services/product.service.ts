import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Order } from '../components/order-form/order';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/';
  private authSecretKey = 'Bearer Token';

  private currentProduct = new BehaviorSubject<any>(null);
  currentProduct$ = this.currentProduct.asObservable();

  private orderSubmitionSuccess = new BehaviorSubject<boolean>(false);
  orderSubmitionSuccess$ = this.orderSubmitionSuccess.asObservable();

  private orderDeletionSuccess = new BehaviorSubject<boolean>(false);
  orderDeletionSuccess$ = this.orderDeletionSuccess.asObservable();

  constructor(private http: HttpClient) {
  }

  getProducts(userId: number): Observable<Order[]> {
    // Create HTTP parameters
    const params = new HttpParams().set('id', userId.toString());

    // Make the GET request with the parameters
    return this.http.get<Order[]>("http://localhost:8080/api/order/all", { params });
}

  addNewOrder(orderForm: Order): void {
    //TODO: Change to form data
    // let orderForm = new Order(
    //   152,
    //   4,
    //   100,
    //   "Weak",
    //   "TestBook2",
    //   "QAEf",
    //   "Format",
    //   240,
    //   110
    // )

    console.log(orderForm);

    this.http.post("http://localhost:8080/api/order/create", orderForm).subscribe((response) => {
      if(response) {
        this.orderSubmitionSuccess.next(true);
      }
    });
  }

  declineOrder(id: number): void {
    this.http.post("localhost:8080/api/order/delete", id).subscribe((respone) => {
      if(respone) {
        this.orderDeletionSuccess.next(true)
      }
    })
  }

  selectProduct(product: any) {
    this.currentProduct.next(product);
  }
}